// Usando JavaScript puro para la animación original
document.addEventListener('DOMContentLoaded', () => {

    console.log("WalletPro cargado correctamente");

    // Animación de entrada para las tarjetas informativas
    const cards = document.querySelector('.glass-feature');
    if (cards) {
        cards.style.opacity = '0';
        cards.style.transition = 'opacity 1.5s ease-in';

        setTimeout(() => {
            cards.style.opacity = '1';
        }, 500);
    }
});

// Usando jQuery para la lógica del nuevo botón
$(document).ready(function () {
    $('#btn-wallet').on('click', function () {
        console.log("Redirigiendo a la billetera...");
    });
});