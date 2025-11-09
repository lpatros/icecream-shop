import { mockIcecream, mockNews, mockUsers } from '../database/mockData.js';

const STORAGE_KEYS = {
    PRODUCTS: 'icecream_products',
    NEWS: 'icecream_news',
    USERS: 'icecream_users'
};

export const initializeLocalStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockIcecream));
        console.log('Produtos inicializados no LocalStorage');
    }

    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(mockNews));
        console.log('Notícias inicializadas no LocalStorage');
    }

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
        console.log('Usuários inicializados no LocalStorage');
    }
};

export const getProducts = () => {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
};

export const getNews = () => {
    const news = localStorage.getItem(STORAGE_KEYS.NEWS);
    return news ? JSON.parse(news) : [];
};

export const getUsers = () => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
};

export const saveProducts = (products) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const saveNews = (news) => {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
};

export const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    console.log('Dados do LocalStorage limpos');
};

export const resetToDefaultData = () => {
    clearAllData();
    initializeLocalStorage();
    console.log('Dados reinicializados com valores padrão');
};

export const syncMockDataWithLocalStorage = () => {
    const currentProducts = getProducts();
    const currentNews = getNews();
    const currentUsers = getUsers();

    let hasUpdates = false;

    // Verifica se os dados mock são diferentes dos dados do localStorage
    const productsNeedUpdate = JSON.stringify(currentProducts) !== JSON.stringify(mockIcecream);
    const newsNeedUpdate = JSON.stringify(currentNews) !== JSON.stringify(mockNews);
    const usersNeedUpdate = JSON.stringify(currentUsers) !== JSON.stringify(mockUsers);

    // Atualiza apenas os dados que são diferentes
    if (productsNeedUpdate) {
        // Mantém os produtos adicionados pelo usuário e atualiza os existentes do mock
        const userAddedProducts = currentProducts.filter(
            product => !mockIcecream.some(mock => mock.id === product.id)
        );
        
        // Combina produtos do mock atualizados com produtos adicionados pelo usuário
        const syncedProducts = [...mockIcecream, ...userAddedProducts];
        saveProducts(syncedProducts);
        console.log('Produtos sincronizados com os dados mock');
        hasUpdates = true;
    }

    if (newsNeedUpdate) {
        // Mantém as notícias adicionadas pelo usuário e atualiza as existentes do mock
        const userAddedNews = currentNews.filter(
            news => !mockNews.some(mock => mock.id === news.id)
        );
        
        // Combina notícias do mock atualizadas com notícias adicionadas pelo usuário
        const syncedNews = [...mockNews, ...userAddedNews];
        saveNews(syncedNews);
        console.log('Notícias sincronizadas com os dados mock');
        hasUpdates = true;
    }

    if (usersNeedUpdate) {
        // Mantém os usuários adicionados pelo usuário e atualiza os existentes do mock
        const userAddedUsers = currentUsers.filter(
            user => !mockUsers.some(mock => mock.id === user.id)
        );
        
        // Combina usuários do mock atualizados com usuários adicionados pelo usuário
        const syncedUsers = [...mockUsers, ...userAddedUsers];
        saveUsers(syncedUsers);
        console.log('Usuários sincronizados com os dados mock');
        hasUpdates = true;
    }

    if (hasUpdates) {
        console.log('Sincronização concluída: dados atualizados');
    } else {
        console.log('Sincronização concluída: nenhuma atualização necessária');
    }

    return hasUpdates;
};

export default {
    initializeLocalStorage,
    getProducts,
    getNews,
    getUsers,
    saveProducts,
    saveNews,
    saveUsers,
    clearAllData,
    resetToDefaultData,
    syncMockDataWithLocalStorage,
    STORAGE_KEYS
};
