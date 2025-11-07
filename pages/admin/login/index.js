import { isAuthenticated, saveLoggedUser } from '../../../util/authUtils.js';
import { getUsers } from '../../../util/localStorageUtils.js';

export const partials = [
    'navbar',
    'footer'
];

const getURLParams = () => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    return {
        expired: params.has('expired'),
        incorrect: params.has('incorrect')
    };
}

const showErrorMessage = (message) => {
    const errorMessageElement = document.getElementById('errorMessage');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }
}

const validateCredentials = (email, password) => {
    const user = getUsers().find(u => u.email === email && u.password === password);
    return user;
}

const handleLogin = (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const user = validateCredentials(email, password);
    
    if (user) {
        saveLoggedUser(user);
        
        window.location.hash = '/admin/products';
    } else {
        showErrorMessage('Email ou senha inválidos');
    }
}

const checkURLMessages = () => {
    const params = getURLParams();
    
    if (params.expired) {
        showErrorMessage('Sessão expirada');
    } 
    
    if (params.incorrect) {
        showErrorMessage('Email ou senha inválidos');
    }
}

export const render = () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    checkURLMessages();
    
    if (isAuthenticated()) {
        window.location.hash = '/admin/products';
    }
};