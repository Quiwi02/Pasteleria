document.addEventListener('DOMContentLoaded', () => {
  const btnEnviar = document.getElementById('btnEnviar');
  const inputComentario = document.getElementById('comentario');

  btnEnviar.addEventListener('click', () => {
    const comentario = inputComentario.value.trim();

    if (comentario === '') {
      alert('Por favor escribe un comentario antes de enviarlo.');
      return;
    }

    // Aquí puedes guardar el comentario en localStorage o enviarlo a un servidor si lo necesitas
    localStorage.setItem('comentarioUsuario', comentario);

    alert('¡Gracias por tu comentario!');
    inputComentario.value = '';
  });

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
});


