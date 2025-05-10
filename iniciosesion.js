document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".container");

  const loginContainer = containers[0];    // Login
  const registroContainer = containers[1]; // Registro

  const btnRegistrarse = document.getElementById("btn-registrarse");
  const btnVolverInicio = document.getElementById("btn-volver-inicio");

  // Mostrar formulario de registro
  btnRegistrarse.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registroContainer.style.display = "block";
  });

  // Volver al formulario de inicio de sesión
  btnVolverInicio.addEventListener("click", () => {
    registroContainer.style.display = "none";
    loginContainer.style.display = "block";
  });
});
