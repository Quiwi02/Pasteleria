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

document.addEventListener("DOMContentLoaded", function () {
    // Obtener las referencias del DOM
    const container = document.querySelector(".container");
    const registerBtn = document.querySelector(".registrarse");

    const registroForm = document.querySelector("#registroForm");

    // Api de registro
    const API_URL = "http://localhost:3000/api";

    // Manejar el formulario de registro
    registroForm.addEventListener("submit", async (e) => {
        e.preventDefault();


        // Obtener los datos del formulario
        const nombre_usuario = registroForm.querySelector('input[type="text"]').value;
        const email = registroForm.querySelector('input[type="email"]').value;
        const contraseña = registroForm.querySelector('input[type="password"]').value;

        try {
            // Enviar la solicitud al servidor
            const response = await fetch(`${API_URL}/registro`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario,
                    email,
                    contraseña
                })
            });

            if (response.ok) {
                alert("Usuario registrado correctamente");

                // Limpiar el formulario
                registroForm.reset();
            } else {
                alert("Error al registrar el usuario");
                registroForm.reset();
            }
        }
        catch (error) {
            console.log("Error al registrar el usuario", error);
        }
    })
})

// login 


document.addEventListener("DOMContentLoaded", function () {
    // Obtener las referencias del DOM
    const container = document.querySelector(".container");
    const loginBtn = document.querySelector(".iniciosesion");

    const loginForm = document.querySelector("#loginForm");

    // Api de registro
    const API_URL = "http://localhost:3000/api";

    // Manejar el formulario de login
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()


        // Obtener los datos del formulario
        const email = loginForm.querySelector('input[type="email"]').value;
        const contraseña = loginForm.querySelector('input[type="password"]').value;

        try {
            // Enviar la solicitud al servidor
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    contraseña
                })
            });

            if (response.ok) {
                alert("Inicio de sesion exitoso");
                window.location.href = 'pasteleria.html';
            } else {
                alert("Usuario y contraseña incorrectos");
                loginForm.reset();
            }
        }
        catch (error) {
            console.log("Error al iniciar sesion", error);
        }
    })
});


