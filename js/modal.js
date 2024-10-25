import { addToCart } from "./carrito.js";
import { updateCartItemCount } from "./localStorage.js";

export function showModal(product) {
    let modal = `<div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">Detalles del producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img id="img" src=${product.image} class="img-fluid mb-3 modal-image" alt="Product Image">
                    <h2 id="modalProductTitle">${product.title}</h2>
                    <p id="modalProductPrice" class="fw-bold"></p>
                    <p id="modalProductDescription">${product.description}</p>
                </div>
                <div class="modal-footer" d-flex justify-content-end>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-dark" id="addToCartBtn" data-bs-dismiss="modal">Agregar al Carrito</button>
                </div>
            </div>`;

    let modalContainer = document.querySelector("#productModal");
    modalContainer.innerHTML = modal;     

    // Aquí se añade el evento de clic para agregar al carrito
    document.getElementById('addToCartBtn').onclick = () => {
        addToCart(product);  // Llama a la función para añadir el producto al carrito
        updateCartItemCount();  // Actualiza el número de ítems en el carrito
    };

    
    
    const myModal = new bootstrap.Modal(modalContainer);
    myModal.show();
}