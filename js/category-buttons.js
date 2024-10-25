import { displayProductsIndex } from './list-products.js';

export function createCategoryButtons(categories, products) {
    const categoryButtonsDiv = document.getElementById('categoryButtons');

    // Botón "Todos los productos"
    const allProductsButton = document.createElement('button');
    allProductsButton.textContent = 'Todos los productos';
    allProductsButton.classList.add('btn', 'btn-dark', 'me-2');
    allProductsButton.addEventListener('click', () => displayProductsIndex(products));
    categoryButtonsDiv.appendChild(allProductsButton);

    // Botones para cada categoría
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('btn', 'btn-dark', 'me-2');
        button.addEventListener('click', () => {
            const filteredProducts = products.filter(product => product.category === category);
            displayProductsIndex(filteredProducts); // Muestra solo los productos filtrados
        });
        categoryButtonsDiv.appendChild(button);
    });
}
