function volverAlInicio() {
    window.location.href = "index.html"; // Adjust as needed
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".ver-horarios").forEach(button => {
        button.addEventListener("click", () => {
            const horarios = button.nextElementSibling;
            if (horarios.style.display === "block") {
                horarios.style.display = "none";
                button.textContent = "Ver horarios";
            } else {
                horarios.style.display = "block";
                button.textContent = "Ocultar horarios";
            }
        });
    });
});