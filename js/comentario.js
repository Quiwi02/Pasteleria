// Función para mostrar/ocultar el menú lateral
function toggleMenu() {
    const menuLateral = document.getElementById("menuLateral");
    menuLateral.classList.toggle("activo");
}

// Función para mostrar/ocultar el carrito (aunque no hay carrito en esta página)
function toggleCarrito() {
    alert("Función de carrito no disponible en esta página.");
}

// Función para manejar el envío del comentario
document.addEventListener("DOMContentLoaded", () => {
    const btnEnviar = document.getElementById("btnEnviar");
    const comentarioInput = document.getElementById("comentario");

    btnEnviar.addEventListener("click", () => {
        const comentario = comentarioInput.value.trim();

        if (comentario.length === 0) {
            alert("Por favor, escribe un comentario antes de enviar.");
            return;
        }

        // Aquí podrías hacer algo más, como enviarlo a un servidor
        alert("¡Gracias por tu comentario!");

        // Limpiar el campo después del envío
        comentarioInput.value = "";
    });
});
