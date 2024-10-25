import { displayProductsIndex } from "./list-products.js";

// Función que maneja la lógica de búsqueda
export function buscarProductos(products) {
    const searchInput = document.getElementById("searchInput");
    const noResultsMessage = document.getElementById("noResults");

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        alert("Por favor ingresa un término de búsqueda.");
        return;
    }

    // Filtrar los productos que coinciden con el término de búsqueda
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
    );

    // Mostrar los productos filtrados
    displayProductsIndex(filteredProducts);

    // Mostrar u ocultar el mensaje de "no resultados"
    if (filteredProducts.length === 0) {
        noResultsMessage.style.display = "block"; // Mostrar mensaje
    } else {
        noResultsMessage.style.display = "none"; // Ocultar mensaje
        searchModal.style.display = 'none'; // Cerrar el modal cuando hay resultados
    }
}

// Añadir eventos al botón de búsqueda y el input
export function setupSearchEvents(products) {
    const buttonSearch = document.getElementById("buttonSearch");
    const searchInput = document.getElementById("searchInput");

    // Evento para manejar la búsqueda con el botón
    buttonSearch.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir recarga de página
        buscarProductos(products);
    });

    // Evento para capturar la tecla "Enter" dentro del input de búsqueda
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Evitar que el formulario se envíe
            buscarProductos(products); // Ejecutar la función de búsqueda
        }
    });
}
