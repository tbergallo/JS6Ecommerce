// Referencias al ícono y al formulario
const searchIcon = document.getElementById('searchIcon');
const searchForm = document.getElementById('searchForm');
const searchContainer = document.querySelector('.search-container');

// Evento de clic en la lupita
searchIcon.addEventListener('click', () => {
    searchContainer.classList.add('show-form');
});
