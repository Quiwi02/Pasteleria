// Script para el menú lateral
document.addEventListener('DOMContentLoaded', function () {
    window.toggleMenu = function () {
        var menuLateral = document.getElementById('menuLateral');
        if (menuLateral) {
            menuLateral.classList.toggle('activo');
        }
    };

    var botonCerrar = document.querySelector('.cerrar-menu');
    if (botonCerrar) {
        botonCerrar.addEventListener('click', function () {
            var menuLateral = document.getElementById('menuLateral');
            if (menuLateral) {
                menuLateral.classList.remove('activo');
            }
        });
    }

    document.addEventListener('click', function (event) {
        var menuLateral = document.getElementById('menuLateral');
        var menuBtn = document.querySelectorAll('.menu-btn');

        if (menuLateral && menuLateral.classList.contains('activo')) {
            let clickedOnButton = false;
            menuBtn.forEach(function (btn) {
                if (btn.contains(event.target)) {
                    clickedOnButton = true;
                }
            });

            if (!menuLateral.contains(event.target) && !clickedOnButton) {
                menuLateral.classList.remove('activo');
            }
        }
    });

    // ===== CARRUSELES =====
    if (typeof bootstrap !== 'undefined') {
        var carouselValentinEl = document.getElementById('carouselValentin');
        if (carouselValentinEl) {
            var carouselValentin = new bootstrap.Carousel(carouselValentinEl, {
                interval: 3000,
                wrap: true,
                keyboard: true
            });
        }

        var carouselPromocionEl = document.getElementById('carouselPromocion');
        if (carouselPromocionEl) {
            var carouselPromocion = new bootstrap.Carousel(carouselPromocionEl, {
                interval: 3500,
                wrap: true,
                keyboard: true
            });
        }

        if (window.innerWidth >= 992) {
            document.querySelectorAll('.carousel').forEach(function (carousel) {
                carousel.addEventListener('mouseenter', function () {
                    var carouselInstance = bootstrap.Carousel.getInstance(this);
                    if (carouselInstance) carouselInstance.pause();
                });

                carousel.addEventListener('mouseleave', function () {
                    var carouselInstance = bootstrap.Carousel.getInstance(this);
                    if (carouselInstance) carouselInstance.cycle();
                });
            });
        }
    }

    adjustCarouselHeight();
    window.addEventListener('resize', adjustCarouselHeight);


function adjustCarouselHeight() {
    if (window.innerWidth < 576) {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach(function (item) {
            const img = item.querySelector('img');
            if (img) {
                const width = item.offsetWidth;
                const aspectRatio = 0.75;
                img.style.height = width * aspectRatio + 'px';
            }
        });
    } else {
        document.querySelectorAll('.carousel-item img').forEach(function (img) {
            img.style.height = '';
        });
    }
}

// Script para el carrito de compras
// Variables globales
let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para mostrar u ocultar el carrito
function toggleCarrito() {
    const carrito = document.getElementById("carritocompras");
    carrito.classList.toggle("visible");
}

// Función para actualizar el contenido del carrito
function actualizarMensajeCarrito() {
    const mensaje = document.getElementById("mensaje-carrito");

    if (!mensaje) return;

    if (productosEnCarrito.length === 0) {
        mensaje.innerHTML = `
            <p>No hay productos en el carrito.</p>
            <p><a href="pasteleria.html">Explore nuestra tienda</a></p>
        `;
    } else {
        mensaje.innerHTML = `
            <p>Tienes ${productosEnCarrito.length} producto(s) en el carrito.</p>
            <ul>
                ${productosEnCarrito.map(p => `<li>${p.nombre} - ${p.precio}</li>`).join("")}
            </ul>
            <button onclick="vaciarCarrito()">Vaciar carrito</button>
            <p><a href="checkout.html">Ir al pago</a></p>
        `;
    }
}

// Función para agregar un producto al carrito
function agregarProducto(producto) {
    if (!producto || !producto.nombre || !producto.precio) return;

    productosEnCarrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    actualizarMensajeCarrito();
}

// Función para vaciar el carrito

function vaciarCarrito() {
    productosEnCarrito = [];
    localStorage.removeItem('carrito');
    actualizarMensajeCarrito();
}

// Inicialización al cargar la página
    window.toggleCarrito = toggleCarrito;
    window.agregarProducto = agregarProducto;
    window.vaciarCarrito = vaciarCarrito;
    actualizarMensajeCarrito();

    adjustCarouselHeight();
    window.addEventListener('resize', adjustCarouselHeight);
});
