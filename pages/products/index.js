import { mockIcecream } from '../../database/mockData.js';

export const partials = [
    "navbar",
    "footer"
]

const createProductCard = (product) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'icecream-card-wrapper';

    cardWrapper.innerHTML = `
        <picture>
            <img src="${product.imageSrc}" alt="${product.name}">
        </picture>
        <div class="card-footer">
            <p class="text-regular">
                ${product.name}
            </p>
            <p class="text-regular"><span class="price-prefix">R$</span>
                ${product.price.toFixed(2)}
            </p>
        </div>
    `;

    return cardWrapper;
}

const renderProducts = () => {
    const productListContainer = document.getElementById('productList');
    
    if (!productListContainer) {
        console.error('Container de produtos não encontrado');
        return;
    }

    productListContainer.innerHTML = '';

    mockIcecream.forEach(product => {
        const productCard = createProductCard(product);
        productListContainer.appendChild(productCard);
    });
}

export const render = () => {
    renderProducts();
}