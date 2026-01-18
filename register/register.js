$(document).ready(function() {
    
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();

        // Referencias
        const btn = $('#btnCrear');
        const status = $('#statusMessage');
        
        // Captura de datos (puedes usarlos para enviarlos a una API)
        const name = $('#fullName').val();
        const email = $('#email').val();
        const pass = $('#password').val();

        // 1. Feedback visual inmediato
        btn.prop('disabled', true).text('Procesando...');
        
        // 2. Simulación de creación de cuenta
        setTimeout(function() {
            // Cambiamos el mensaje de estado
            status.html(`
                <div class="alert alert-dark border-0 shadow-sm"; color: white;">
                    ¡Cuenta creada con éxito! <br>
                    <strong>Redirigiendo al Iniciar Sesión...</strong>
                </div>
            `);

            // 3. Redirección final
            setTimeout(function() {
                window.location.href = '../menu/menu.html';
            }, 1500);

        }, 1000);
    });
});