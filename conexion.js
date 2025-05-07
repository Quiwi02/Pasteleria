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

// Script para mostrar y cerrar el modal de pago QR
document.addEventListener('DOMContentLoaded', function () {
    var btnAbrirQR = document.querySelector('.pagos'); // Botón que abre el modal
    var modalQR = document.querySelector('.modal-qr'); // Modal en sí
    var btnCerrarQR = document.getElementById('cerrarModalQR'); // Botón (X) para cerrar
    var inputConstancia = document.getElementById('constancia'); // Input oculto
    var labelConstancia = document.querySelector('label[for="constancia"]'); // Label que activa input

    if (btnAbrirQR && modalQR && btnCerrarQR) {
        btnAbrirQR.addEventListener('click', function () {
            modalQR.classList.remove('d-none');
        });

        btnCerrarQR.addEventListener('click', function () {
            modalQR.classList.add('d-none');
        });

        modalQR.addEventListener('click', function (e) {
            if (e.target === modalQR) {
                modalQR.classList.add('d-none');
            }
        });

        // Activar input oculto al hacer clic en el botón personalizado
        if (labelConstancia && inputConstancia) {
            labelConstancia.addEventListener('click', function () {
                inputConstancia.click();
            });
        }
    }
});
const modal = document.querySelector('.modal-direccion');
    const abrirBtn = document.getElementById('abrirModalDireccion');
    const cerrarBtn = document.getElementById('cerrarModalDireccion');
  
    abrirBtn.addEventListener('click', () => {
      modal.classList.remove('d-none');
    });
  
    cerrarBtn.addEventListener('click', () => {
      modal.classList.add('d-none');
    });
  
    document.getElementById('usarUbicacion').addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
  
            // Ejemplo con OpenStreetMap para obtener dirección
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
              .then(response => response.json())
              .then(data => {
                document.getElementById('direccionManual').value = data.display_name;
              }).catch(() => {
                alert('No se pudo convertir la ubicación a dirección.');
              });
  
          },
          () => {
            alert('No se pudo obtener la ubicación. Revisa los permisos del navegador.');
          }
        );
      } else {
        alert('Tu navegador no soporta geolocalización.');
      }
    });
  
    document.getElementById('confirmarDireccion').addEventListener('click', () => {
      const direccion = document.getElementById('direccionManual').value.trim();
      if (!direccion) {
        alert('Por favor ingresa una dirección o usa tu ubicación.');
        return;
      }
      console.log("Dirección confirmada:", direccion);
      modal.classList.add('d-none');
      // Aquí puedes enviar la dirección al servidor o mostrarla en otra parte del checkout
    });