import { mockNews, mockIcecream } from '../../util/mockData.js';

console.log('home.js loaded');

function renderNewsHighlight() {
    const container = document.querySelector('#home-shop');
    if (!container) return;

    // Pega a primeira notícia
    const news = mockNews[3];

    container.innerHTML = `
        <div class="text-wrapper">
            <h1 class="heading">${news.name}</h1>
            <p class="text-regular">${news.description}</p>
            <a href="/news" class="btn-primary">Saiba mais</a>
        </div>
        <picture>
            <img src="../../../public/${news.imageSrc}" alt="${news.name}">
        </picture>
    `;
}

function renderNewerProducts() {
    const list = document.querySelector('#home-products');
    if (!list) return;

    // Simula "Lançamentos Recentes": pega até 4 primeiros
    const items = mockIcecream.slice(0, 3);
    list.innerHTML = items
        .map(
            (p) => `
            <div class="icecream-card-wrapper">
                <picture>
                    <img src="../../../public/${p.imageSrc}" alt="${p.name}">
                </picture>
                <div class="card-footer">
                    <p class="text-regular">${p.name}</p>
                    <p class="text-regular"><span class="price-prefix">R$</span>${p.price.toFixed(2)}</p>
                </div>
            </div>
        `
        )
        .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderNewsHighlight();
    renderNewerProducts();
});