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
    STORAGE_KEYS
};
