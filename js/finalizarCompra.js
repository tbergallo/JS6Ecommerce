import { emptyCart } from "./localStorage.js";

export function finalizarCompra() {
    let productStorage = JSON.parse(localStorage.getItem("productosCarrito")) || [];

    // Creamos el resumen de la compra
    let summaryContent = '<ul class="list-group">';
    productStorage.forEach(p => {
        summaryContent += `
            <li class="list-group-item d-flex align-items-center">
                <img src="${p.image}" class="img-thumbnail" style="width: 50px; height: auto; margin-right: 10px;" alt="${p.title}">
                <span class="flex-grow-1">${p.title} (x${p.quantity})</span>
                <span>$${(p.price * p.quantity).toFixed(2)}</span>
            </li>`;
    });
    summaryContent += `</ul>
        <div class="text-end fw-bold mt-3">
            Total: $${productStorage.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </div>`;

    // Creamos el modal dinámicamente
    const modalHTML = `
    <div class="modal fade" id="purchaseSummaryModal" tabindex="-1" aria-labelledby="purchaseSummaryLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg"> <!-- Ajuste del tamaño del modal -->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="purchaseSummaryLabel">Resumen de Compra</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="purchaseSummaryContent">
                        ${summaryContent} <!-- Aquí se inserta el contenido del resumen -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-dark" id="finalizePurchase">Confirmar compra</button>
                </div>
            </div>
        </div>
    </div>`;

    // Insertamos el modal dinámico en el body del documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Inicializamos y mostramos el modal usando Bootstrap
    const summaryModal = new bootstrap.Modal(document.getElementById('purchaseSummaryModal'));
    summaryModal.show();

    // Eliminar el modal del DOM al cerrarlo para evitar duplicados
    const modalElement = document.getElementById('purchaseSummaryModal');
    modalElement.addEventListener('hidden.bs.modal', () => {
        modalElement.remove();
    });

    // Obtener referencia al sidebar (Offcanvas)
    const sidebar = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasRight'));
    
    // Vaciar el localStorage al finalizar la compra
    const finalizePurchaseBtn = document.getElementById('finalizePurchase');
    finalizePurchaseBtn.addEventListener('click', () =>{
        emptyCart();
        summaryModal.hide();
        sidebar.hide();

        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });

        alert('¡Su compra se realizó con éxito!')
    
    })};

