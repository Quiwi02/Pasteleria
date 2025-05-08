// Script para el menú lateral
document.addEventListener('DOMContentLoaded', function() {
    window.toggleMenu = function() {
        var menuLateral = document.getElementById('menuLateral');
        if (menuLateral) {
            menuLateral.classList.toggle('activo');
        }
    };
    
    var botonCerrar = document.querySelector('.cerrar-menu');
    if (botonCerrar) {
        botonCerrar.addEventListener('click', function() {
            var menuLateral = document.getElementById('menuLateral');
            if (menuLateral) {
                menuLateral.classList.remove('activo');
            }
        });
    }
    
    document.addEventListener('click', function(event) {
        var menuLateral = document.getElementById('menuLateral');
        var menuBtn = document.querySelectorAll('.menu-btn');
        
        if (menuLateral && menuLateral.classList.contains('activo')) {
            let clickedOnButton = false;
            menuBtn.forEach(function(btn) {
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
            document.querySelectorAll('.carousel').forEach(function(carousel) {
                carousel.addEventListener('mouseenter', function() {
                    var carouselInstance = bootstrap.Carousel.getInstance(this);
                    if (carouselInstance) carouselInstance.pause();
                });
                
                carousel.addEventListener('mouseleave', function() {
                    var carouselInstance = bootstrap.Carousel.getInstance(this);
                    if (carouselInstance) carouselInstance.cycle();
                });
            });
        }
    }
    
    adjustCarouselHeight();
    window.addEventListener('resize', adjustCarouselHeight);
});

function adjustCarouselHeight() {
    if (window.innerWidth < 576) {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach(function(item) {
            const img = item.querySelector('img');
            if (img) {
                const width = item.offsetWidth;
                const aspectRatio = 0.75;
                img.style.height = width * aspectRatio + 'px';
            }
        });
    } else {
        document.querySelectorAll('.carousel-item img').forEach(function(img) {
            img.style.height = '';
        });
    }
}

// Script para el carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    const carrito = document.getElementById('carritocompras');
    const cerrarCarrito = document.querySelector('.cerrar-carrito');
    const modalCarrito = document.getElementById('modal-carrito');
    const carritoContenido = document.querySelector('.carrito-contenido');

    // Función para abrir el carrito
    function abrirCarrito() {
        carrito.classList.add('active');
    }

    // Función para cerrar el carrito
    function cerrarModalCarrito() {
        carrito.classList.remove('active');
    }

    // Evento para cerrar el carrito
    cerrarCarrito.addEventListener('click', cerrarModalCarrito);

    // Ejemplo de función para agregar productos al carrito
    function agregarAlCarrito(nombre, precio) {
        const productoExistente = Array.from(carritoContenido.children).find(elemento =>
            elemento.querySelector('p') && elemento.querySelector('p').textContent.includes(nombre)
        );

        if (productoExistente) {
            const cantidadElemento = productoExistente.querySelector('.cantidad');
            let cantidad = parseInt(cantidadElemento.textContent);
            cantidad++;
            cantidadElemento.textContent = cantidad;
        } else {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.innerHTML = `
                <p>${nombre} - $${precio}</p>
                <span class="cantidad">1</span>
                <button class="eliminar-producto">Eliminar</button>
            `;
            carritoContenido.appendChild(productoDiv);
        }

        actualizarMensajeCarrito();
    }

    // Ejemplo de función para eliminar productos del carrito
    carritoContenido.addEventListener('click', function(e) {
        if (e.target.classList.contains('eliminar-producto')) {
            e.target.parentElement.remove();
            actualizarMensajeCarrito();
        }
    });

    // Función para actualizar el mensaje del carrito
    function actualizarMensajeCarrito() {
        const productos = document.querySelectorAll('.producto-carrito');
        const mensajeVacio = document.querySelector('.carrito-contenido p:nth-child(1)');
        const mensajeExplorar = document.querySelector('.carrito-contenido p:nth-child(2)');

        if (productos.length === 0) {
            mensajeVacio.style.display = 'block';
            mensajeExplorar.style.display = 'block';
        } else {
            mensajeVacio.style.display = 'none';
            mensajeExplorar.style.display = 'none';
        }
    }

    // Ejemplo de cómo podrías agregar un producto al carrito
    // agregarAlCarrito('Producto 1', 10.99);
});
