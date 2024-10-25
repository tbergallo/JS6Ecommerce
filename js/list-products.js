import { showModal } from "./modal.js";

export function displayProductsIndex(products) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const productGrid = document.createElement('section');
    productGrid.classList.add('product-grid');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const title = document.createElement('p');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        price.classList.add('product-price');

        const link = document.createElement('a');
        link.href = `#`;
        link.textContent = 'Ver más';
        link.classList.add('btn', 'btn-dark');
        link.classList.add('product-link');
        link.addEventListener('click', () => showModal(product));

        productInfo.appendChild(title);
        productInfo.appendChild(price);
        productInfo.appendChild(link);

        productDiv.appendChild(img);
        productDiv.appendChild(productInfo);

        productGrid.appendChild(productDiv);
    });

    main.appendChild(productGrid);
}