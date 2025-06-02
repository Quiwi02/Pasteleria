document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.querySelector(".container-iniciosesion");
    const registroContainer = document.querySelector(".container-registro");
    const containerPrincipal = document.querySelector(".container");
    const modalReset = document.getElementById("reset-password");
    const btnCloseReset = document.getElementById("close-reset");
    const btnRegistrarse = document.getElementById("tab-signup");
    const btnIniciarsesion = document.getElementById("tab-login");
    const btnReset = document.getElementById("reset");
    const registroForm = document.getElementById("registroForm");
    const checkboxTerminos = document.getElementById("terminos");

    // Mostrar formulario de registro
    btnRegistrarse.addEventListener("click", () => {
        loginContainer.style.display = "none";
        registroContainer.style.display = "flex";
    });

    // Mostrar formulario de inicio de sesión
    btnIniciarsesion.addEventListener("click", () => {
        registroContainer.style.display = "none";
        loginContainer.style.display = "flex";
    });

    // Mostrar modal de Olvidaste tu contraseña y ocultar container principal
    btnReset.addEventListener("click", () => {
        containerPrincipal.style.display = "none";
        modalReset.style.display = "flex";
    });

    // Cerrar el modal y volver a mostrar el container principal
    btnCloseReset.addEventListener("click", () => {
        modalReset.style.display = "none";
        containerPrincipal.style.display = "block";
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modalReset) {
            modalReset.style.display = "none";
            containerPrincipal.style.display = "block";
        }
    });

    // Validación de checkbox de términos en el formulario de registro
    registroForm.addEventListener("submit", function (e) {
        if (!checkboxTerminos.checked) {
            e.preventDefault();
            alert("Debes aceptar los términos, condiciones y políticas para registrarte.");
        }
    });
});





// Registro-Backend
document.addEventListener("DOMContentLoaded", function () {
    // Obtener las referencias del DOM
    const container = document.querySelector(".container-registro");
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


// Login 
document.addEventListener("DOMContentLoaded", function () {
    // Obtener las referencias del DOM
    const container = document.querySelector(".container-iniciosesion");
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
                window.location.href = '/html/pasteleria.html';
            } else {
                alert("Email y contraseña incorrectos");
                loginForm.reset();
            }
        }
        catch (error) {
            console.log("Error al iniciar sesion", error);
        }
    })
});


