import { createAside } from "./sideBar.js";
import { updateCartItemCount } from "./localStorage.js";

export function showSidebar() {
    const sidebar = document.getElementById('offcanvasRight');

    // Inicializar el offcanvas con Bootstrap
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebar); 

    // Mostrar el sidebar
    bsOffcanvas.show();

    // Ya no es necesario manejar el botón de cierre de forma manual, 
    // Bootstrap se encarga de esto automáticamente. Aplicar regla de no reinventar la rueda
}

export function addToCart(product){
    let objlocalStorage = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    let productExists = objlocalStorage.find((prod) => prod.id == product.id)
    let index = objlocalStorage.findIndex((prod) => prod.id == product.id)

    if (productExists)
    {
        objlocalStorage[index].quantity += 1;
    } 
    else
    {
        product.quantity = 1;
        objlocalStorage.push(product);
    }
    
    localStorage.setItem("productosCarrito", JSON.stringify(objlocalStorage))
    updateCartItemCount(); //se llama función para actualizar el numerod de productos
}