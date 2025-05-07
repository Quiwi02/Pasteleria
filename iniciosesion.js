const containers = document.querySelectorAll(".container");
const btnRegistrarse = document.querySelector(".Registrarse"); // Botón de registro en login
const btnIniciarSesion = document.querySelector(".inisiosesion"); // Botón de inicio

const loginContainer = containers[0];    // Primer contenedor (login)
const registroContainer = containers[1]; // Segundo contenedor (registro)

// Mostrar formulario de registro
btnRegistrarse.addEventListener("click", () => {
  loginContainer.style.display = "none";
  registroContainer.style.display = "block";
});

// Mostrar formulario de inicio de sesión
registroContainer.querySelector(".iniciar-sesion").addEventListener("click", () => {
  registroContainer.style.display = "none";
  loginContainer.style.display = "block";
});