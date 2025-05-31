document.addEventListener('DOMContentLoaded', function () {
    // --- MENÚ LATERAL ---
    window.toggleMenu = function () {
        const menuLateral = document.getElementById('menuLateral');
        if (menuLateral) {
            menuLateral.classList.toggle('activo');
        }
    };

    document.querySelector('.cerrar-menu')?.addEventListener('click', function () {
        document.getElementById('menuLateral')?.classList.remove('activo');
    });

    document.addEventListener('click', function (event) {
        const menuLateral = document.getElementById('menuLateral');
        const menuBtn = document.querySelectorAll('.menu-btn');
        if (menuLateral?.classList.contains('activo')) {
            let clickedOnButton = Array.from(menuBtn).some(btn => btn.contains(event.target));
            if (!menuLateral.contains(event.target) && !clickedOnButton) {
                menuLateral.classList.remove('activo');
            }
        }
    });

    // --- MODAL QR ---
    const btnAbrirQR = document.querySelector('.pagos');
    const modalQR = document.querySelector('.modal-qr');
    const btnCerrarQR = document.getElementById('cerrarModalQR');
    const inputConstancia = document.getElementById('constancia');
    const labelConstancia = document.querySelector('label[for="constancia"]');
    const btnPagarQR = modalQR?.querySelector('.btn-danger');

    if (btnAbrirQR && modalQR && btnCerrarQR && labelConstancia && inputConstancia) {
        btnAbrirQR.addEventListener('click', () => modalQR.classList.remove('d-none'));
        btnCerrarQR.addEventListener('click', () => modalQR.classList.add('d-none'));
        labelConstancia.addEventListener('click', () => inputConstancia.click());

        btnPagarQR?.addEventListener('click', () => {
            const archivo = inputConstancia.files[0];

            if (!archivo) {
                return Swal.fire({
                    icon: 'warning',
                    title: 'Falta constancia',
                    text: 'Por favor, sube una constancia de pago antes de continuar.'
                });
            }

            // POST al backend para registrar el pedido
            const carrito = JSON.parse(localStorage.getItem('cart')) || [];
            const productos = carrito.map(p => ({
                id_productos: p.id,
                cantidad: p.quantity
            }));

            fetch('http://localhost:3000/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuario: 1, // ⚠️ Reemplazar con el ID real del usuario logueado
                    metodo_pago: 'QR',
                    productos: productos
                })
            })
                .then(res => res.json())
                .then(pago => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido realizado',
                        text: 'Tu pedido ha sido registrado correctamente.'
                    });

                    modalQR.classList.add('d-none');
                    localStorage.removeItem('cart');
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo registrar el pedido.'
                    });
                });
        });
    }

    // --- MODAL DIRECCIÓN DELIVERY ---
    const btnAbrirModalDireccion = document.getElementById('abrirModalDireccion');
    const modalDireccion = document.querySelector('.modal-direccion');
    const btnCerrarModalDireccion = document.getElementById('cerrarModalDireccion');
    const btnUsarUbicacion = document.getElementById('usarUbicacion');
    const btnConfirmarDireccion = document.getElementById('confirmarDireccion');
    const inputDireccionManual = document.getElementById('direccionManual');

    btnAbrirModalDireccion?.addEventListener('click', () => modalDireccion.classList.remove('d-none'));
    btnCerrarModalDireccion?.addEventListener('click', () => modalDireccion.classList.add('d-none'));

    btnUsarUbicacion?.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('La geolocalización no es soportada en este navegador.');
            return;
        }
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            inputDireccionManual.value = `Ubicación actual: Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`;
        }, () => {
            alert('No se pudo obtener tu ubicación.');
        });
    });

    btnConfirmarDireccion?.addEventListener('click', () => {
        if (inputDireccionManual.value.trim() !== '') {
            Swal.fire({
                icon: 'success',
                title: 'Dirección confirmada',
                text: `Entregaremos tu pedido en: ${inputDireccionManual.value}`
            });
            modalDireccion.classList.add('d-none');
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Por favor, ingresa o usa una dirección válida.'
            });
        }
    });

    // --- MOSTRAR CARRITO EN RESUMEN ---
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const contenedorProductos = document.querySelector('.productos-resumen');
    const subtotalElemento = document.querySelector('.subtotal');
    const totalElemento = document.querySelector('.total');

    function obtenerImagen(nombre) {
        const n = nombre.toLowerCase();
        if (n.includes("guanábana") || n.includes("guanabana")) return "torta2.jpg";
        if (n.includes("crocante") || n.includes("vainilla")) return "torta4.jpg";
        if (n.includes("bosque") || n.includes("fresas")) return "torta5.jpg";
        if (n.includes("butter") || n.includes("cream")) return "torta6.jpg";
        if (n.includes("temática") || n.includes("tematica") || n.includes("personalizada")) return "torta8.jpg";
        if (n.includes("tres leches")) return "torta3.jpg";
        if (n.includes("alfajor")) return "bocadito1.jpg";
        if (n.includes("cupcake") || n.includes("mini")) return "bocadito3.jpg";
        if (n.includes("profiterol")) return "bocadito4.jpg";
        return "default.jpg";
    }

    function mostrarResumenCarrito() {
        contenedorProductos.innerHTML = '';
        let subtotal = 0;

        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('d-flex', 'justify-content-between', 'mb-2');
            const imagenProducto = item.image || `/imagen/${obtenerImagen(item.name)}`;

            div.innerHTML = `
                <img src="${imagenProducto}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                <div class="flex-grow-1">
                    <span>${item.name} x${item.quantity}</span>
                </div>
                <div>
                    <span>S/ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;

            contenedorProductos.appendChild(div);
            subtotal += item.price * item.quantity;
        });

        subtotalElemento.textContent = `S/ ${subtotal.toFixed(2)}`;
        const extras = 0.00;
        const total = subtotal + extras;
        totalElemento.textContent = `S/ ${total.toFixed(2)}`;

        const montoQR = document.getElementById('montoTotalQR');
        if (montoQR) {
            montoQR.textContent = `S/ ${total.toFixed(2)}`;
        }
    }

    mostrarResumenCarrito();

    // --- CUPÓN DE DESCUENTO ---
    const btnAplicarCupon = document.querySelector('.btn-secondary');
    const inputCupon = document.querySelector('input.form-control');

    btnAplicarCupon?.addEventListener('click', () => {
        const codigo = inputCupon.value.trim().toUpperCase();
        let descuento = 0;
        let subtotal = parseFloat(subtotalElemento.textContent.replace('S/', '').trim());

        if (codigo === 'DROSSI10') {
            descuento = subtotal * 0.10;
        }

        if (descuento > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Cupón aplicado',
                text: `Descuento de S/ ${descuento.toFixed(2)} aplicado.`
            });

            totalElemento.textContent = `S/ ${(subtotal - descuento).toFixed(2)}`;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cupón inválido',
                text: 'El código ingresado no es válido.'
            });
        }
    });
});
