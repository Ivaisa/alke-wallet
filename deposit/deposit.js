$(document).ready(function () {
    // --- 1. Mostrar saldo actual al cargar la página ---
    function obtenerSaldo() {
        let saldo = localStorage.getItem('walletBalance');
        if (saldo === null) {
            saldo = 60000; // Saldo inicial por defecto
            localStorage.setItem('walletBalance', saldo);
        }
        return parseFloat(saldo);
    }

    function actualizarVistaSaldo() {
        const saldoActual = obtenerSaldo();
        $('#currentBalanceDisplay').text('$' + saldoActual.toLocaleString('es-CL'));
    }

    actualizarVistaSaldo();

    // --- 2. Captura de eventos y validación con jQuery ---
    $('#depositForm').on('submit', function (event) {
        event.preventDefault();

        const montoTexto = $('#depositAmount').val();
        const montoADepositar = parseFloat(montoTexto);

        if (isNaN(montoADepositar) || montoADepositar <= 0) {
            mostrarAlerta("danger", "¡Error! Por favor, ingrese un monto válido mayor a cero.");
            return;
        }

        // --- 3. Procesar depósito ---
        const saldoActual = obtenerSaldo();
        const nuevoSaldo = saldoActual + montoADepositar;

        // Guardar en Local Storage
        localStorage.setItem('walletBalance', nuevoSaldo);

        // --- 4. Feedback Visual ---
        $('#deposit-legend')
            .html(`Confirmado: Se ha depositado <strong>$${montoADepositar.toLocaleString('es-CL')}</strong> exitosamente.`)
            .fadeIn();

        mostrarAlerta("success", `¡Depósito exitoso! Su nuevo saldo es $${nuevoSaldo.toLocaleString('es-CL')}.`);

        // Deshabilitar botón para evitar múltiples clics
        $('#btnSubmit').prop('disabled', true);

        // --- 5. Redirigir ---
        setTimeout(function () {
            window.location.href = "../menu/menu.html";
        }, 2000);
    });

    // Función para crear alertas dinámicamente
    function mostrarAlerta(tipo, mensaje) {
        const alertaHtml = `
            <div class="alert alert-${tipo} alert-dismissible fade show border-0" role="alert">
                ${mensaje}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        $('#alert-container').html(alertaHtml);
    }
});