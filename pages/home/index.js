import { getNews, getProducts } from '../../util/localStorageUtils.js';

const renderNewsHighlight = () => {
    const container = document.querySelector('#home-shop');
    if (!container) return;

    // Pega a ultima notícia
    const news = getNews().slice(-1)[0];

    container.innerHTML = `
        <div class="text-wrapper">
            <h1 class="heading">${news.name}</h1>
            <p class="text-regular">${news.description}</p>
            <a href="#/news" class="btn-primary">Saiba mais</a>
        </div>
        <picture>
            <img src="${news.imageSrc}" alt="${news.name}">
        </picture>
    `;
}

const renderNewerProducts = () => {
    const list = document.querySelector('#home-products');
    if (!list) return;

    // Simula "Lançamentos Recentes": pega até os 3 ultimos produtos adicionados
    const items = getProducts().slice(-3).reverse();
    list.innerHTML = items
        .map(
            (p) => `
            <div class="icecream-card-wrapper">
                <picture>
                    <img src="${p.imageSrc}" alt="${p.name}">
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

export const partials = [
    "navbar",
    "footer"
]

export const render = () => {
    renderNewerProducts();
    renderNewsHighlight();
}