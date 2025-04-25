
// Script para el menú lateral y carruseles
document.addEventListener('DOMContentLoaded', function() {
    var botonesMenu = document.querySelectorAll('.menu-btn');
    botonesMenu.forEach(function(boton) {
        boton.addEventListener('click', function() {
            var menuLateral = document.getElementById('menuLateral');
            if (menuLateral) {
                menuLateral.classList.toggle('activo');
            }
        });
    });
    
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
        var menuBtn = document.querySelector('.menu-btn');
        
        if (menuLateral && menuLateral.classList.contains('activo') &&
            !menuLateral.contains(event.target) && 
            !menuBtn.contains(event.target)) {
            
            menuLateral.classList.remove('activo');
        }
    });
    
    // ===== CARRUSELES =====
    if (typeof bootstrap !== 'undefined') {
        // Inicializar el carrusel de San Valentín
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

function toggleMenu() {
    var menuLateral = document.getElementById('menuLateral');
    if (menuLateral) {
        menuLateral.classList.toggle('activo');
    }
}

function navegador() {
    toggleMenu();
}

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