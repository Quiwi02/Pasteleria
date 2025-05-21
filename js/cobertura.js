// Función para alternar la visibilidad del menú móvil
function toggleMenu() {
    const menu = document.querySelector('.navbar-drossi');
    menu.classList.toggle('menu-visible'); // Cambia la clase al hacer clic en el menú
}

// Mostrar u ocultar los horarios cuando se haga clic en "Ver horarios"
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".ver-horarios").forEach(button => {
        button.addEventListener("click", () => {
            const horarios = button.nextElementSibling;
            if (horarios.style.display === "block") {
                horarios.style.display = "none";
                button.textContent = "Ver horarios";
            } else {
                horarios.style.display = "block";
                button.textContent = "Ocultar horarios";
            }
        });
    });
});

// Función para cambiar la dirección en la que el usuario hace el pedido
function cambiarDireccion() {
    const direccion = document.querySelector('.ingresar-direccion input').value;
    if (direccion) {
        alert("Dirección cambiada a: " + direccion);
    } else {
        alert("Por favor ingresa una dirección válida.");
    }
}

// Función para cambiar la dirección a la ubicación actual
function usarUbicacionActual() {
    // Puedes obtener la ubicación actual utilizando la Geolocalización si lo deseas.
    // Aquí se simula con una dirección predefinida.
    alert("Usando ubicación actual: Av. Salvador Allende, Pucallpa.");
}

// Función para manejar el clic en "Ordena aquí"
document.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
        alert("¡Gracias por ordenar con nosotros!");
    });
});

// Evento para mostrar/ocultar el menú en dispositivos móviles
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-drossi');
        navbar.classList.toggle('menu-visible');
    });
}

// Opcional: agregar animaciones para el menú
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.navbar-drossi');
    menu.classList.add('transition-all'); // Agregar una transición CSS para el menú si es necesario.
});
