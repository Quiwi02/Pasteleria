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