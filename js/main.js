import { displayProductsIndex } from "./list-products.js";
import { createCategoryButtons } from './category-buttons.js';
import { initializeLocalStorage, updateCartItemCount } from './localStorage.js';
import { showSidebar } from "./sideBar.js";
import { setupSearchEvents } from './search-products.js'; // Importar función para configurar búsqueda

document.addEventListener('DOMContentLoaded', () => {
    
    initializeLocalStorage();
    const productsUrl = 'https://fakestoreapi.com/products';
    const categoriesUrl = 'https://fakestoreapi.com/products/categories';
    
    Promise.all([
        fetch(productsUrl).then(response => response.json()),
        fetch(categoriesUrl).then(response => response.json())
    ])
    .then(([products, categories]) => {
        // Mostrar todos los productos inicialmente
        displayProductsIndex(products);

        // Crear botones de categorías
        createCategoryButtons(categories, products);

        // Crear botones de categorías en el sidebar para móviles
        createSidebarCategoryButtons(categories, products);

        // Configurar eventos de búsqueda DESPUÉS de cargar los productos
        setupSearchEvents(products); // Llamar la función con la lista de productos
    })
    .catch(error => console.error('Error fetching products or categories:', error));
    
     // Funcionalidad del menú hamburguesa para abrir/cerrar el sidebar
     const hamburgerMenu = document.getElementById('hamburgerMenu');
     const categorySidebar = document.getElementById('categorySidebar');
 
     hamburgerMenu.addEventListener('click', () => {
         categorySidebar.classList.toggle('active'); // Alternar el sidebar
     });
});

// Referencias al ícono de la lupita, modal y botón de cierre
const searchIcon = document.getElementById('searchIcon');
const searchModal = document.getElementById('searchModal');
const closeModal = document.getElementById('closeModal');

// Evento para abrir el modal al hacer clic en la lupa
searchIcon.addEventListener('click', () => {
    searchModal.style.display = 'block';
});

// Evento para cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
    searchModal.style.display = 'none';
});

// Evento para cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === searchModal) {
        searchModal.style.display = 'none';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorage();  // Inicializa el carrito si no existe en localStorage
    updateCartItemCount();    // Actualiza el número de ítems en el carrito
});

document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cartBtn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showSidebar(); // Mostrar la barra lateral con los productos del carrito
        });
    } else {
        console.error('Botón del carrito no encontrado');
    }
});

/*/////////////////////*/

// Crear botones de categorías en el sidebar de móvil
function createSidebarCategoryButtons(categories, products) {
    const categorySidebarButtonsDiv = document.getElementById('categorySidebarButtons');

    // Crear botón "Todos los productos"
    const allProductsButton = document.createElement('button');
    allProductsButton.textContent = 'Todos los productos';
    allProductsButton.classList.add('btn', 'btn-dark', 'w-100' ,'mb-2');
    allProductsButton.addEventListener('click', () => displayProductsIndex(products));
    categorySidebarButtonsDiv.appendChild(allProductsButton);

    // Crear botones para cada categoría
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('btn', 'btn-dark','w-100' ,'mb-2');
        button.addEventListener('click', () => {
            const filteredProducts = products.filter(product => product.category === category);
            displayProductsIndex(filteredProducts);
        });
        categorySidebarButtonsDiv.appendChild(button);
    });
}