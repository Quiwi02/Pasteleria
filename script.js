function navegador() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

document.querySelector('.cerrar-menu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
});

document.getElementById('textbusqueda').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.toLowerCase();
        const images = document.querySelectorAll('.promocion1 img, .promocion2 img');
        images.forEach(img => {
            const altText = img.alt.toLowerCase();
            if (altText.includes(query)) {
                img.style.display = 'inline-block';
            } else {
                img.style.display = 'none';
            }
        });
    }
});

document.querySelector('.inicio').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
});

document.querySelector('.pasteleria').addEventListener('click', function() {
    abrirPasteleriaproductos();
});

function abrirPasteleriaproductos() {
    const productos = document.getElementById('productos');
    productos.style.display = 'block';
}

window.addEventListener('click', function(event) {
    const productos = document.getElementById('productos');
    if (event.target == productos) {
        productos.style.display = 'none';
    }
});
