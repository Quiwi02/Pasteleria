function volverAlInicio() {
    window.location.href = "index.html";
}

document.querySelectorAll('.ver-horarios').forEach(button => {
    button.addEventListener('click', function() {
        const horarios = this.nextElementSibling;
        if (horarios.style.display === 'none' || horarios.style.display === '') {
            horarios.style.display = 'block';
        } else {
            horarios.style.display = 'none';
        }
    });
});