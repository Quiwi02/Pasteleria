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
});

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

