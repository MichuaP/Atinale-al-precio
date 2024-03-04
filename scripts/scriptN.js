document.addEventListener('keydown', function(event) {
    // Verifica si la tecla presionada es Enter (código 13)
    if (event.key === 'Enter') {
        // Redirige a la sig página
        window.location.href = 'introducirNom.html';
    }
});