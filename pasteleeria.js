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
        
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        
        alert('se añadio :D');
      });
    });
    
    // Función para actualizar el contador del carrito
    function updateCartCount() {
      const badge = document.querySelector('.badge');
      badge.textContent = cart.length;
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

  // Script para el menú lateral
document.addEventListener('DOMContentLoaded', function() {
  window.togglePasteleria = function() {
      var pasteleriaLateral = document.getElementById('pasteleriaLateral');
      if (pasteleriaLateral) {
          pasteleriaLateral.classList.toggle('activo');
      }
  };
  
  var botonCerrar = document.querySelector('.cerrar-pasteleria');
  if (botonCerrar) {
      botonCerrar.addEventListener('click', function() {
          var pasteleriaLateral = document.getElementById('pasteleriaLateral');
          if (pasteleriaLateral) {
              pasteleriaLateral.classList.remove('activo');
          }
      });
  }
  
  document.addEventListener('click', function(event) {
      var pasteleriaLateral = document.getElementById('pasteleriaLateral');
      var pasteleriaBtn = document.querySelectorAll('.pasteleria');
      
      if (pasteleriaLateral && pasteleriaLateral.classList.contains('activo')) {
          let clickedOnButton = false;
          pasteleriaBtn.forEach(function(btn) {
              if (btn.contains(event.target)) {
                  clickedOnButton = true;
              }
          });
          
          if (!pasteleriaLateral.contains(event.target) && !clickedOnButton) {
              pasteleriaLateral.classList.remove('activo');
          }
      }
  });
});
