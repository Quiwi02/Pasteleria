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
  });

  // Script para el carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    window.toggleCart = function() {
        var carritocompras = document.getElementById('carritocompras');
        if (carritocompras) {
            carritocompras.classList.toggle('activo');
        }
    };
    
    var botonCerrar = document.querySelector('.cerrar-carrito');
    if (botonCerrar) {
        botonCerrar.addEventListener('click', function() {
            var carritocompras = document.getElementById('carritocompras');
            if (carritocompras) {
                carritocompras.classList.remove('activo');
            }
        });
    }
    
    document.addEventListener('click', function(event) {
        var carritocompras = document.getElementById('carritocompras');
        var carritoBtn = document.querySelectorAll('.cart-btn');
        
        if (carritocompras && carritocompras.classList.contains('activo')) {
            let clickedOnButton = false;
            carritoBtn.forEach(function(btn) {
                if (btn.contains(event.target)) {
                    clickedOnButton = true;
                }
            });
            
            if (!carritocompras.contains(event.target) && !clickedOnButton) {
                carritocompras.classList.remove('activo');
            }
        }
    });
});