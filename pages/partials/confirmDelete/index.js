import { isAuthenticated } from "../../../util/authUtils.js";
import { getProducts, saveProducts, getNews, saveNews, getUsers, saveUsers } from "../../../util/localStorageUtils.js";

export const partials = [];

const getEntityType = (hash) => {
    if (hash.includes('/admin/products/delete')) return 'products';
    if (hash.includes('/admin/news/delete')) return 'news';
    if (hash.includes('/admin/users/delete')) return 'users';
    return null;
};

const getBackUrl = (entityType) => {
    const urls = {
        'products': '#/admin/products',
        'news': '#/admin/news',
        'users': '#/admin/users'
    };
    return urls[entityType] || '#/admin/products';
};

const getEntityName = (entityType) => {
    const names = {
        'products': 'produto',
        'news': 'novidade',
        'users': 'administrador'
    };
    return names[entityType] || 'item';
};

const getItemById = (entityType, id) => {
    const getters = {
        'products': getProducts,
        'news': getNews,
        'users': getUsers
    };
    
    const items = getters[entityType]();
    return items.find(item => item.id === parseInt(id));
};

const deleteItemById = (entityType, id) => {
    const getters = {
        'products': getProducts,
        'news': getNews,
        'users': getUsers
    };
    
    const savers = {
        'products': saveProducts,
        'news': saveNews,
        'users': saveUsers
    };
    
    const items = getters[entityType]();
    const filteredItems = items.filter(item => item.id !== parseInt(id));
    savers[entityType](filteredItems);
    
    return filteredItems.length < items.length;
};

export const render = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login?expired=true';
        return;
    }
    
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const id = urlParams.get('id');
    const entityType = getEntityType(hash);
    
    if (!id || !entityType) {
        window.location.hash = '#/admin/products';
        return;
    }
    
    const item = getItemById(entityType, id);
    
    if (!item) {
        window.location.hash = getBackUrl(entityType);
        return;
    }
    
    const itemNameElement = document.getElementById('itemName');
    if (itemNameElement) {
        itemNameElement.textContent = item.name;
    }
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.hash = getBackUrl(entityType);
        });
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            
            deleteItemById(entityType, id);
            
            window.location.hash = getBackUrl(entityType);
        });
    }
};
