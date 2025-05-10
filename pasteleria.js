document.addEventListener('DOMContentLoaded', function() {
  // Inicializar carrito
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();

  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          const productCard = this.closest('.producto');
          const productName = productCard.querySelector('.card-title').textContent;
          const productPrice = productCard.querySelector('.price').textContent.replace('S/ ', '');

          const existingProduct = cart.find(p => p.id === productId);
          if (existingProduct) {
              existingProduct.quantity += 1;
          } else {
              cart.push({
                  id: productId,
                  name: productName,
                  price: productPrice,
                  quantity: 1
              });
          }

          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
          alert('Producto añadido al carrito');
      });
  });

  // Función para actualizar el contador del carrito
  function updateCartCount() {
      const badge = document.getElementById('cart-count');
      badge.textContent = cart.reduce((total, product) => total + product.quantity, 0);
  }

  // Función para la búsqueda
  const searchInput = document.querySelector('.buscar-torta input');
  searchInput.addEventListener('keyup', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll('.producto').forEach(item => {
          const productName = item.querySelector('.card-title').textContent.toLowerCase();
          const productDesc = item.querySelector('.card-text').textContent.toLowerCase();

          if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
              item.closest('.col').style.display = 'block';
          } else {
              item.closest('.col').style.display = 'none';
          }
      });
  });
});

function abrirCarrito() {
  const cartModal = document.getElementById('carritocompras');
  cartModal.style.display = 'block';
  actualizarCarrito();
}

function cerrarCarrito() {
  const cartModal = document.getElementById('carrritocompras');
  cartModal.style.display = 'none';
}

function actualizarCarrito() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach(producto => {
      const item = document.createElement('div');
      item.classList.add('cart-item');
      item.innerHTML = `
          <p>${producto.name} - S/ ${producto.price}</p>
          <button onclick="restarCantidad(${producto.id})">-</button>
          <span>${producto.quantity}</span>
          <button onclick="sumarCantidad(${producto.id})">+</button>
      `;
      cartItems.appendChild(item);
  });

  calcularTotal();
}

function sumarCantidad(id) {
  const producto = cart.find(p => p.id === id);
  if (producto) {
      producto.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      actualizarCarrito();
  }
}

function restarCantidad(id) {
  const producto = cart.find(p => p.id === id);
  if (producto && producto.quantity > 1) {
      producto.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      actualizarCarrito();
  }
}

function calcularTotal() {
  const subtotal = cart.reduce((total, producto) => total + producto.price * producto.quantity, 0);
  const extras = 0; // Puedes cambiar esto según los extras
  const total = subtotal + extras;

  document.getElementById('subtotal').innerText = subtotal.toFixed(2);
  document.getElementById('extras').innerText = extras.toFixed(2);
  document.getElementById('total').innerText = total.toFixed(2);
}

function confirmarCompra() {
  alert('Compra confirmada');
  cerrarCarrito();
}

function seguirComprando() {
  cerrarCarrito();
}

document.querySelector('.close-cart-modal').addEventListener('click', cerrarCarrito);

// Script para el menú lateral
document.addEventListener('DOMContentLoaded', function() {
  window.toggleMenu = function() {
      var menuLateral = document.getElementById('menuLateral');
      if (menuLateral) {
          menuLateral.classList.toggle('activo');
      }
  };

  var botonCerrar = document.querySelector('.cerrar-menu');
  if (botonCerrar) {
      botonCerrar.addEventListener('click', function() {
          var menuLateral = document.getElementById('menuLateral');
          if (menuLateral) {
              menuLateral.classList.remove('activo');
          }
      });
  }

  document.addEventListener('click', function(event) {
      var menuLateral = document.getElementById('menuLateral');
      var menuBtn = document.querySelectorAll('.menu-btn');

      if (menuLateral && menuLateral.classList.contains('activo')) {
          let clickedOnButton = false;
          menuBtn.forEach(function(btn) {
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


// Script para el modal del carrito
let cart = [];

document.addEventListener('DOMContentLoaded', function () {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    actualizarContadorCarrito();
    actualizarCarrito();

    document.getElementById('search').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const name = card.querySelector('.card-title').innerText.toLowerCase();
            card.style.display = name.includes(query) ? 'block' : 'none';
        });
    });
});

function mostrarCarrito() {
    document.getElementById('carritocompras').style.display = 'block';
    actualizarCarrito();
}

function cerrarCarrito() {
    document.getElementById('carritocompras').style.display = 'none';
}

function agregarAlCarrito(nombre, precio) {
    const productoExistente = cart.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        cart.push({ nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function actualizarContadorCarrito() {
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.nombre} - S/ ${item.precio.toFixed(2)} x ${item.cantidad}</span>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="restarCantidad(${index})">−</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="sumarCantidad(${index})">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    calcularTotal();
}

function sumarCantidad(index) {
    cart[index].cantidad += 1;
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarCarrito();
}

function restarCantidad(index) {
    cart[index].cantidad -= 1;
    if (cart[index].cantidad <= 0) {
        cart.splice(index, 1);
    }
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarCarrito();
}

function calcularTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const extras = subtotal * 0.1; // Por ejemplo, 10% extra
    const total = subtotal + extras;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('extras').innerText = extras.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}
