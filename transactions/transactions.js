$(document).ready(function() {
    // 1. Datos de las transacciones
    const listaTransacciones = [
        { id: "TX-9921", tipo: "compra", descripcion: "Compra Online", monto: 50.00, fecha: "01/01/2026" },
        { id: "TX-8832", tipo: "deposito", descripcion: "Depósito Bancario", monto: 100.00, fecha: "02/01/2026" },
        { id: "TX-7743", tipo: "transferencia", descripcion: "Transferencia Recibida", monto: 75.00, fecha: "02/01/2026" },
        { id: "TX-5512", tipo: "compra", descripcion: "Suscripción Mensual", monto: 5550.00, fecha: "03/01/2026" },
        { id: "TX-2210", tipo: "deposito", descripcion: "Depósito a Cuenta", monto: 10500.00, fecha: "03/01/2026" },
        { id: "TX-1109", tipo: "transferencia", descripcion: "Transferencia Recibida", monto: 7575.00, fecha: "03/01/2026" }
    ];

    // 2. Formateo de tipos
    function getTipoTransaccion(tipo) {
        const nombres = {
            'compra': '🛍️ Compra',
            'deposito': '💰 Depósito',
            'transferencia': '💸 Transferencia'
        };
        return nombres[tipo] || tipo;
    }

    // 3. Función principal de renderizado
    function renderizarMovimientos(filtro) {
        const $lista = $('#transactionList');
        $lista.empty();

        listaTransacciones.forEach(tx => {
            // Lógica de filtrado: si es 'todos' o coincide el tipo
            if (filtro === 'todos' || tx.tipo === filtro) {
                const itemHtml = `
                    <div class="list-group-item" 
                         data-fecha="${tx.fecha}" 
                         data-id="${tx.id}" 
                         data-desc="${tx.descripcion}">
                        <span>${getTipoTransaccion(tx.tipo)}</span>
                        <span class="monto">$${tx.monto.toLocaleString('es-CL')}</span>
                    </div>
                `;
                $lista.append(itemHtml);
            }
        });
    }

    // 4. Captura de eventos: Cambio de Filtro
    $('#filtroTipo').on('change', function() {
        renderizarMovimientos($(this).val());
    });

    // 5. Captura de eventos: Detalle al hacer clic
    $('#transactionList').on('click', '.list-group-item', function() {
        const tipo = $(this).find('span:first-child').text();
        const monto = $(this).find('.monto').text();
        const fecha = $(this).data('fecha');
        const id = $(this).data('id');
        const desc = $(this).data('desc');

        alert(
            "DETALLE DE LA OPERACIÓN\n" +
            "-----------------------------\n" +
            "ID: " + id + "\n" +
            "Descripción: " + desc + "\n" +
            "Tipo: " + tipo + "\n" +
            "Monto: " + monto + "\n" +
            "Fecha: " + fecha + "\n" +
            "Estado: Completado ✅"
        );
    });

    // Inicialización
    renderizarMovimientos('todos');
});