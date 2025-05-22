document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  fetchProductos();

  function updateCartCount() {
    const badge = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    badge.textContent = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }

  function fetchProductos() {
    fetch("http://localhost:3000/api/productos")
      .then((response) => {
        console.log('Status de respuesta:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        
        if (Array.isArray(data)) {
          renderProductos(data);
        } else {
          console.error("Los datos recibidos no son un array:", data);
          if (data.message) {
            alert(`Error del servidor: ${data.message}`);
          }
        }
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar productos. Verifica que el servidor esté funcionando.");
      });
  }

  function renderProductos(productos) {
    // Selecciona TODAS las secciones de pastelería
    const todasLasSecciones = document.querySelectorAll('.pasteleria .row');
    
    console.log(`Total de secciones encontradas: ${todasLasSecciones.length}`);
    
    // Mapear secciones basándose en los títulos
    const secciones = {};
    
    todasLasSecciones.forEach((seccion, index) => {
      const tituloElement = seccion.parentElement.querySelector('.titulo h2');
      if (tituloElement) {
        const titulo = tituloElement.textContent.toLowerCase().trim();
        console.log(`Sección ${index + 1}: "${titulo}"`);
        secciones[titulo] = seccion;
      }
    });

    console.log("Secciones mapeadas:", Object.keys(secciones));

    // LIMPIAR todas las secciones antes de agregar productos
    Object.values(secciones).forEach(seccion => {
      if (seccion) {
        seccion.innerHTML = '';
        console.log("Sección limpiada");
      }
    });

    productos.forEach((producto) => {
      // Normalizar categoría
      const categoriaNormalizada = producto.categoria
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
      
      console.log(`Producto: ${producto.nombre}`);
      console.log(`Categoría original: "${producto.categoria}"`);
      console.log(`Categoría normalizada: "${categoriaNormalizada}"`);
      
      const contenedor = secciones[categoriaNormalizada];

      if (contenedor) {
        console.log(`Agregando ${producto.nombre} a ${categoriaNormalizada}`);
        
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
                <div class="card h-100 producto">
                    <img src="/imagen/${obtenerImagen(producto.nombre)}" 
                         class="card-img-top" 
                         alt="${producto.nombre}"
                         onerror="this.src='/imagen/default.jpg'">
                    <div class="card-body">
                        <h3 class="card-title h5">${producto.nombre}</h3>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="price fw-bold">S/ ${parseFloat(producto.precio).toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${producto.id_productos}">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            `;
        contenedor.appendChild(card);

        // Enlaza botón al carrito
card.querySelector(".add-to-cart").addEventListener("click", function () {
  const productId = this.getAttribute("data-id");
  const productName = producto.nombre;
  const productPrice = parseFloat(producto.precio);

  if (isNaN(productPrice)) {
    alert("Precio inválido para este producto. Revisa los datos.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((p) => p.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  abrirCarrito();
  alert("Producto añadido al carrito");
});

      } else {
        console.warn(`No se encontró contenedor para la categoría: "${categoriaNormalizada}"`);
        console.log('Categorías disponibles:', Object.keys(secciones));
      }
    });
  }

  // Función auxiliar para elegir imagen según el nombre
  function obtenerImagen(nombre) {
    const n = nombre.toLowerCase();
    
    // Tortas
    if (n.includes("guanábana") || n.includes("guanabana")) return "torta2.jpg";
    if (n.includes("crocante") || n.includes("vainilla")) return "torta4.jpg";
    if (n.includes("bosque") || n.includes("fresas")) return "torta5.jpg";
    if (n.includes("butter") || n.includes("cream")) return "torta6.jpg";
    if (n.includes("temática") || n.includes("tematica") || n.includes("personalizada")) return "torta8.jpg";
    if (n.includes("tres leches")) return "torta3.jpg";
    
    // Bocaditos
    if (n.includes("alfajor")) return "bocadito1.jpg";
    if (n.includes("cupcake") || n.includes("mini")) return "bocadito3.jpg";
    if (n.includes("profiterol")) return "bocadito4.jpg";
    
    return "default.jpg";
  }

  // Buscador
  const searchInput = document.querySelector(".buscar-torta input");
  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll(".producto").forEach((item) => {
        const productName = item.querySelector(".card-title").textContent.toLowerCase();
        const productDesc = item.querySelector(".card-text").textContent.toLowerCase();

        item.closest(".col").style.display =
          productName.includes(searchTerm) || productDesc.includes(searchTerm)
            ? "block"
            : "none";
      });
    });
  }

  // Menú lateral
  window.toggleMenu = function () {
    var menuLateral = document.getElementById("menuLateral");
    if (menuLateral) {
      menuLateral.classList.toggle("activo");
    }
  };

  document.addEventListener("click", function (event) {
    var menuLateral = document.getElementById("menuLateral");
    var menuBtn = document.querySelectorAll(".menu-btn");

    if (menuLateral && menuLateral.classList.contains("activo")) {
      let clickedOnButton = false;
      menuBtn.forEach(function (btn) {
        if (btn.contains(event.target)) {
          clickedOnButton = true;
        }
      });

      if (!menuLateral.contains(event.target) && !clickedOnButton) {
        menuLateral.classList.remove("activo");
      }
    }
  });
});

// --- MODAL DEL CARRITO ---
function abrirCarrito() {
  const cartModal = document.getElementById("carritocompras");
  if (cartModal) {
    cartModal.classList.add("visible");
    actualizarCarrito();
  }
}

function cerrarCarrito() {
  const cartModal = document.getElementById("carritocompras");
  if (cartModal) {
    cartModal.classList.remove("visible");
  }
}

function actualizarCarrito() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  
  if (!cartItems) return;
  
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No hay productos en el carrito.</p>";
    updateTotals(0, 0, 0);
    return;
  }

  cart.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
            <p>${producto.name} - S/ ${producto.price.toFixed(2)}</p>
            <button onclick="restarCantidad('${producto.id}')">-</button>
            <span>${producto.quantity}</span>
            <button onclick="sumarCantidad('${producto.id}')">+</button>
        `;
    cartItems.appendChild(item);
  });

  calcularTotal();
  updateCartCount();
}

function updateTotals(subtotal, extras, total) {
  const subtotalEl = document.getElementById("subtotal");
  const extrasEl = document.getElementById("extras");
  const totalEl = document.getElementById("total");
  
  if (subtotalEl) subtotalEl.innerText = subtotal.toFixed(2);
  if (extrasEl) extrasEl.innerText = extras.toFixed(2);
  if (totalEl) totalEl.innerText = total.toFixed(2);
}

function sumarCantidad(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const producto = cart.find((p) => p.id === id);
  if (producto) {
    producto.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    actualizarCarrito();
  }
}

function restarCantidad(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const producto = cart.find((p) => p.id === id);
  if (producto && producto.quantity > 1) {
    producto.quantity -= 1;
  } else if (producto) {
    cart = cart.filter((p) => p.id !== id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarCarrito();
}

function calcularTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce(
    (total, producto) => total + producto.price * producto.quantity,
    0
  );
  const extras = 0;
  const total = subtotal + extras;

  updateTotals(subtotal, extras, total);
}

function confirmarCompra() {
  alert("Compra confirmada");
  cerrarCarrito();
}

function seguirComprando() {
  cerrarCarrito();
}