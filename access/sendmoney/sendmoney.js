$(document).ready(function () {
    let selectedContact = null;

    // Carga inicial de datos (RUT, Banco y Alias visibles)
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [
        { name: "Olguita Marina", rut: "8.238.375-k", alias: "olguita.marina", bank: "Banco Estado" },
        { name: "Juanito Perez", rut: "18.765.432-1", alias: "juanito.perez", bank: "Banco de Chile" }
    ];

    function renderContacts(filter = "") {
        const $list = $('#contactList');
        $list.empty();

        const filteredContacts = contacts.filter(c =>
            c.name.toLowerCase().includes(filter.toLowerCase()) ||
            c.alias.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredContacts.length === 0) {
            $list.append('<li class="list-group-item text-center">No se encontraron contactos</li>');
            return;
        }

        filteredContacts.forEach((c, index) => {
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random&color=fff&rounded=true`;

            const $li = $(`
                <li class="list-group-item" data-index="${index}">
                    <div class="contact-main-info">
                        <img src="${avatarUrl}" alt="Avatar" class="avatar">
                        <div class="contact-info">
                            <span class="contact-name">${c.name}</span>
                            <span class="contact-details">RUT: ${c.rut}</span>
                            <span class="contact-details">Banco: ${c.bank} | Alias: ${c.alias}</span>
                        </div>
                    </div>
                    <div class="contact-actions">
                        <button class="btn-action btn-edit" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn-action btn-delete" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </li>
            `);

            // Seleccionar para enviar
            $li.find('.contact-main-info').on('click', function () {
                $('.list-group-item').removeClass('active-selection');
                $(this).parent().addClass('active-selection');
                selectedContact = c;
                $('#transferArea').slideDown();
            });

            // Botón Editar
            $li.find('.btn-edit').on('click', function (e) {
                e.stopPropagation();
                editContact(index);
            });

            // Botón Eliminar
            $li.find('.btn-delete').on('click', function (e) {
                e.stopPropagation();
                deleteContact(index);
            });

            $list.append($li);
        });
    }

    // Abrir modal para nuevo contacto
    $('#btnOpenAddModal').on('click', function() {
        $('#formContact')[0].reset();
        $('#editIndex').val("-1");
        $('#modalTitle').text("Nuevo Contacto");
        $('#modalContacto').modal('show');
    });

    // Guardar (Nuevo o Editado)
    $('#formContact').on('submit', function (e) {
        e.preventDefault();
        const index = parseInt($('#editIndex').val());
        const newContact = {
            name: $('#newName').val().trim(),
            rut: $('#newRut').val().trim(),
            alias: $('#newAlias').val().trim(),
            bank: $('#newBank').val().trim()
        };

        if (index === -1) {
            contacts.push(newContact);
        } else {
            contacts[index] = newContact;
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
        $('#modalContacto').modal('hide');
    });

    function editContact(index) {
        const c = contacts[index];
        $('#newName').val(c.name);
        $('#newRut').val(c.rut);
        $('#newAlias').val(c.alias);
        $('#newBank').val(c.bank);
        $('#editIndex').val(index);
        $('#modalTitle').text("Editar Contacto");
        $('#modalContacto').modal('show');
    }

    function deleteContact(index) {
        if (confirm("¿Estás seguro de eliminar este contacto?")) {
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
            $('#transferArea').hide();
        }
    }

    // Búsqueda
    $('#searchContact').on('input', function () {
        renderContacts($(this).val());
        $('#transferArea').hide();
    });

    // Enviar dinero (Simulación)
    $('#sendMoneyForm').on('submit', function (e) {
        e.preventDefault();
        const amount = parseFloat($('#sendAmount').val());
        let balance = parseFloat(localStorage.getItem('walletBalance') || '60000');

        if (amount > 0 && amount <= balance) {
            localStorage.setItem('walletBalance', balance - amount);
            $('#successMessage').fadeIn().delay(2000).fadeOut();
            setTimeout(() => { window.location.href = "../menu/menu.html"; }, 2500);
        } else {
            alert("Saldo insuficiente.");
        }
    });

    renderContacts();
});