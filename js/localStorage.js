//Inicializar localstorage
export function initializeLocalStorage(){
    let objlocalStorage = JSON.parse(localStorage.getItem('productosCarrito')) ;

    if (objlocalStorage == null)
    {
        localStorage.setItem('productosCarrito', JSON.stringify([]));
    }
}

export function updateCartItemCount() {
    let cartItems = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    let itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Aquí seleccionamos el botón del carrito y actualizamos su contenido
    const cartButton = document.querySelector('.btn-primary i');
    cartButton.textContent = ` ${itemCount}`; // Actualiza el ícono del carrito con el número de productos
}

export function emptyCart() {
    localStorage.removeItem('productosCarrito');
    updateCartItemCount()
}