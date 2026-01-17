$(document).ready(function() {
    
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();

        const alertContainer = $('#alertContainer');
        const btn = $('#btnIngresar');

        alertContainer.empty();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        // VALIDACIÓN DE CAMPOS
        if (email === "" || password === "") {
            mostrarAlerta("danger", "Por favor, completa todos los campos.");
            return;
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            mostrarAlerta("warning", "El formato del correo electrónico no es válido.");
            return;
        }

        // Simulación de carga
        btn.prop('disabled', true).text('Verificando...');

        const emailCorrecto = "admin@correo.com";
        const passwordCorrecta = "123456";
        

        setTimeout(function() {
            if (email === emailCorrecto && password === passwordCorrecta) {
                mostrarAlerta("dark", "<strong>¡Éxito!</strong> Credenciales correctas. Redirigiendo...");
                
                setTimeout(function() {
                    // Redirección al archivo menu.html
                    window.location.href = '../menu/menu.html'; 
                }, 1200);

            } else {
                mostrarAlerta("danger", "<strong>Error:</strong> Correo o contraseña incorrectos.");
                btn.prop('disabled', false).text('Ingresar');
            }
        }, 800);
    });

    function mostrarAlerta(tipo, mensaje) {
        $('#alertContainer').html(`
            <div class="alert alert-${tipo} border-0 animate__animated animate__fadeIn" role="alert">
                ${mensaje}
            </div>
        `);
    }
});