import { getNews } from '../../../util/localStorageUtils.js';
import { notFoundHtml } from '../../404/index.js';

export const partials = [
    "navbar",
    "footer"
]

const getNewsIdFromURL = () => {
    const param = window.location.hash.split('?')[1];

    if (!param) {
        return null;
    }

    const urlParams = new URLSearchParams(param);
    return urlParams.get('id');
}

const findNewsById = (id) => {
    return getNews().find(news => news.id === parseInt(id));
}

const renderNewsDetail = () => {
    const newsContainer = document.getElementById('newsDetail');
    
    if (!newsContainer) {
        console.error('Container de detalhes da notícia não encontrado');
        return;
    }

    const newsId = getNewsIdFromURL();

    const morePage = document.getElementById('more-page');
    
    if (!newsId) {
        morePage.innerHTML = notFoundHtml
        return;
    }

    const news = findNewsById(newsId);

    if (!news) {
        morePage.innerHTML = notFoundHtml
        return;
    }

    newsContainer.innerHTML = `
        <div class="text-wrapper">
            <h1 class="heading">
                ${news.name}
            </h1>
            <p class="text-regular">
                ${news.description}
            </p>
            <a href="#/news" class="btn-primary">Voltar</a>
        </div>
        <picture>
            <img src="/${news.imageSrc}" alt="${news.name}">
        </picture>
    `;
}

export const render = () => {
    renderNewsDetail();
}