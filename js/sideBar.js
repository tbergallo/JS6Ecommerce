import { finalizarCompra } from "./finalizarCompra.js";
import { updateCartItemCount } from "./localStorage.js";

export function createAside(){
    let body = document.querySelector(".offcanvas-body");
    
    // nos aseguramos que el body existe
    if (!body) {
        console.error('Elemento con clase "offcanvas-body" no existe.');
        return;
    }
    
    // trae producto del localStorage
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    let asideContent = '';

    // Creamos HTML con los items seleccionados
    productStorage.forEach((p) => {
        asideContent += `
        <div class="card mb-3" style="max-width: 540px;" data-product-id="${p.id}">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${p.image}" class="img-fluid rounded-start" alt="${p.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <p class="card-title">${p.title}</p>
                        <p class="fw-bold">$<span class="product-price">${(p.price * p.quantity).toFixed(2)}</span></p>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-outline-primary btn-sm ms-2" data-action="decrease">-</button>                            
                            <span class="product-quantity mx-2">${p.quantity}</span>
                            <button class="btn btn-outline-primary btn-sm me-2" data-action="increase">+</button>
                            <button class="btn btn-outline-danger btn-sm ms-auto" data-action="remove">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

     // Sección de precio total y botón "Finalizar compra"
     const totalPrice = productStorage.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
     asideContent += `
         <div class="text-end fw-bold">
             Total: $<span id="total-price">${totalPrice}</span>
         </div>
         <div class="text-center mt-3">
           <button class="btn btn-dark" id="finalizePurchaseBtn">Finalizar Compra</button>
         </div>`;  

    body.innerHTML = asideContent;

     // agrego event listeners para sumar restar y eliminar items
    body.querySelectorAll('.card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        card.querySelector('[data-action="increase"]').addEventListener('click', () => updateProductQuantity(productId, 'increase'));
        card.querySelector('[data-action="decrease"]').addEventListener('click', () => updateProductQuantity(productId, 'decrease'));
        card.querySelector('[data-action="remove"]').addEventListener('click', () => removeProductFromCart(productId));
    });

    //agrego event listener del boton Finalizar compra
    document.getElementById('finalizePurchaseBtn').addEventListener('click', () => {
        if (productStorage.length > 0) {
            finalizarCompra(); // Call the function to finalize the purchase
        } else {
            alert('¡Su carrito está vacío!'); // Show an alert if the cart is empty
        }
    });
    
}

// Funcion para actualizar cantidad de items en el carrito
function updateProductQuantity(productId, action) {
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    const productIndex = productStorage.findIndex(prod => prod.id == productId);

    if (productIndex !== -1) {
        if (action === 'increase') {
            productStorage[productIndex].quantity += 1;
        } else if (action === 'decrease' && productStorage[productIndex].quantity > 1) {
            if (productStorage[productIndex].quantity > 1) {
                productStorage[productIndex].quantity -= 1;
            } else {
                //Opcional Eliminar artículo si la cantidad es inferior a 1
                removeProductFromCart(productId);
                return;
            }
        }

        // Guardar y actualiza el carrito en localStorage
        localStorage.setItem('productosCarrito', JSON.stringify(productStorage));

        // Vuelve a renderizar el sideBar para reflejar la nueva cantidad
        createAside();
    }
}

// Function para eliminar items en el carrito
function removeProductFromCart(productId) {
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];
    productStorage = productStorage.filter(prod => prod.id != productId);

    // Guardar y actualiza el carrito en localStorage
    localStorage.setItem('productosCarrito', JSON.stringify(productStorage));

    // Vuelve a renderizar el sideBar para reflejar el item eliminado
    createAside();

    // Actualiza el contador de items en el carrito
    updateCartItemCount();
}

// Funcion muestro el resumen de la compra
function showPurchaseSummaryModal() {
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];

    // creo el resumen de la compra
    let summaryContent = '<ul class="list-group">';
    productStorage.forEach(p => {
        summaryContent += `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${p.title} (x${p.quantity})
            <span>$${(p.price * p.quantity).toFixed(2)}</span>
        </li>`;
    });
    summaryContent += `</ul>
        <div class="text-end fw-bold mt-3">
            Total: $${productStorage.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </div>`;

    // Seteo el contenido en el modal y lo muestro
    document.getElementById('purchaseSummaryContent').innerHTML = summaryContent;
    const summaryModal = new bootstrap.Modal(document.getElementById('purchaseSummaryModal'));
    summaryModal.show();
}

export function showSidebar() {
    const sidebar = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));
    sidebar.show(); // Mostrar el sidebar

    createAside();  // Crear el contenido dinámicamente basado en los productos del carrito
}