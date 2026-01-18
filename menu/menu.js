$(document).ready(function() {
    // 1. Inicialización de datos
    // Si no hay saldo guardado, empezamos con 60,000
    let saldo = parseFloat(localStorage.getItem('walletBalance')) || 60000;
    actualizarSaldoVista();

    // 2. Función de Redirección con feedback visual
    function redirigirA(archivo, nombrePantalla) {
        $("#mensaje-status")
            .hide()
            .text("Abriendo " + nombrePantalla + "...")
            .fadeIn();
        
        setTimeout(function() {
            window.location.href = archivo;
        }, 800);
    }

    // 3. Captura de eventos del menú
    $("#btnDeposit").on('click', function(e) {
        e.preventDefault();
        redirigirA("../deposit/deposit.html", "Depósitos");
    });

    $("#btnSend").on('click', function(e) {
        e.preventDefault();
        redirigirA("../sendmoney/sendmoney.html", "Envío de Dinero");
    });

    $("#btnTransactions").on('click', function(e) {
        e.preventDefault();
        redirigirA("../transactions/transactions.html", "Historial");
    });

    // 4. Actualizar la vista del saldo
    function actualizarSaldoVista() {
        $("#main-balance").text("$" + saldo.toLocaleString('es-CL'));
        localStorage.setItem('walletBalance', saldo);
    }
});