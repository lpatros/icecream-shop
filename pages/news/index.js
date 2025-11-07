import { getProducts, getNews } from '../../util/localStorageUtils.js';

export const partials = [
    "navbar",
    "footer"
]

const createProductPreviewCard = (product) => {
    const cardPreview = document.createElement('div');
    cardPreview.className = 'card-preview';

    cardPreview.innerHTML = `
        <picture>
            <img src="${product.imageSrc}" alt="${product.name}">
        </picture>
        <div class="card-content news-wrapper">
            <h1>
                ${product.name}
            </h1>
            <p class="text-regular content-wrapper-size">
                ${product.description}
            </p>
        </div>
    `;

    return cardPreview;
}

const createNewsCard = (news) => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';

    newsCard.innerHTML = `
        <picture>
            <img src="${news.imageSrc}" alt="${news.name}">
        </picture>
        <div class="card-content">
            <h1>
                ${news.name}
            </h1>
            <p class="text-description text-regular">
                ${news.description}
            </p>

            <a class="btn-primary" href="#/news/more?id=${news.id}"> Ver mais
                <i class="fas fa chevron-right"></i>
            </a>
        </div>
    `;

    return newsCard;
}

const renderNewerProducts = () => {
    const productsContainer = document.getElementById('newerProductsList');
    
    if (!productsContainer) {
        console.error('Container de produtos não encontrado');
        return;
    }

    productsContainer.innerHTML = '';

    const newerProducts = getProducts().slice(-2).reverse();

    newerProducts.forEach(product => {
        const productCard = createProductPreviewCard(product);
        productsContainer.appendChild(productCard);
    });
}

const renderNews = () => {
    const newsContainer = document.getElementById('newsList');
    
    if (!newsContainer) {
        console.error('Container de notícias não encontrado');
        return;
    }

    newsContainer.innerHTML = '';

    getNews().forEach(news => {
        const newsCard = createNewsCard(news);
        newsContainer.appendChild(newsCard);
    });
}

export const render = () => {
    renderNewerProducts();
    renderNews();
}