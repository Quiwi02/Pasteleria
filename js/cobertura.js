// Función para abrir/cerrar menú lateral
function toggleMenu() {
  const menuLateral = document.querySelector('.menu-lateral');
  menuLateral.classList.toggle('activo');
}

// Esperar a que DOM cargue para asignar eventos
document.addEventListener('DOMContentLoaded', () => {
  // Toggle menú
  document.querySelector('.menu-btn').addEventListener('click', toggleMenu);
  document.querySelector('.cerrar-menu').addEventListener('click', toggleMenu);

  // Botón carrito
  const botonCarrito = document.getElementById('botonCarrito');
  botonCarrito.addEventListener('click', () => {
    alert('Carrito de compras está vacío o no implementado aún.');
  });

  // Botón ubicación actual
  const btnUbicacion = document.getElementById('btnUbicacion');
  const inputDireccion = document.getElementById('inputDireccion');
  btnUbicacion.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no es soportada por tu navegador.');
      return;
    }
    btnUbicacion.disabled = true;
    btnUbicacion.textContent = 'Obteniendo ubicación...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Puedes cambiar esto para hacer reverse geocoding con API externa
        inputDireccion.value = `Latitud: ${latitude.toFixed(5)}, Longitud: ${longitude.toFixed(5)}`;
        btnUbicacion.textContent = 'Usar ubicación actual';
        btnUbicacion.disabled = false;
      },
      (err) => {
        alert('Error al obtener ubicación: ' + err.message);
        btnUbicacion.textContent = 'Usar ubicación actual';
        btnUbicacion.disabled = false;
      }
    );
  });

  // Mostrar/ocultar horarios por sucursal
  const botonesVerHorarios = document.querySelectorAll('.ver-horarios');
  botonesVerHorarios.forEach((boton) => {
    boton.addEventListener('click', () => {
      const horarios = boton.nextElementSibling;
      if (!horarios) return;
      if (horarios.style.display === 'none' || horarios.style.display === '') {
        horarios.style.display = 'block';
        boton.textContent = 'Ocultar horarios';
      } else {
        horarios.style.display = 'none';
        boton.textContent = 'Ver horarios';
      }
    });
  });

  // Botones "Ordena aquí", "Recojo en tienda" y "Delivery"
  const locationCards = document.querySelectorAll('.location-card');
  locationCards.forEach((card) => {
    const nombreSucursal = card.querySelector('h3').textContent;

    // Ordena aquí
    const btnOrdena = card.querySelector('.order-button');
    btnOrdena.addEventListener('click', () => {
      alert(`Has seleccionado ordenar en la sucursal: ${nombreSucursal}`);
      // Aquí iría lógica para redirigir o mostrar pedido
    });

    // Recojo en tienda
    const btnRecojo = card.querySelector('.badge.pickup');
    if (btnRecojo) {
      btnRecojo.addEventListener('click', () => {
        alert(`Has seleccionado "Recojo en tienda" en ${nombreSucursal}`);
      });
    }

    // Delivery
    const btnDelivery = card.querySelector('.badge.delivery');
    if (btnDelivery) {
      btnDelivery.addEventListener('click', () => {
        alert(`Has seleccionado "Delivery" en ${nombreSucursal}`);
      });
    }
  });
});
