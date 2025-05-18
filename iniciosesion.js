document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector(".container-iniciosesion");
  const registroContainer = document.querySelector(".container-registro");
  
  const btnRegistrarse = document.getElementById("btn-registrarse");
  const btnVolverInicio = document.getElementById("btn-volver-inicio");

  // Mostrar formulario de registro
  btnRegistrarse.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registroContainer.style.display = "flex";
  });

  // Volver al formulario de inicio de sesión
  btnVolverInicio.addEventListener("click", () => {
    registroContainer.style.display = "none";
    loginContainer.style.display = "flex";
  });

});
