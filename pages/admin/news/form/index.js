import { isAuthenticated } from "../../../../util/authUtils.js";
import { getNews, saveNews } from "../../../../util/localStorageUtils.js";

export const partials = ['navbarAdmin'];

let isEditMode = false;
let editingNewsId = null;

const showError = (message) => {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
};

const getNewsById = (id) => {
    const newsList = getNews();
    return newsList.find(news => news.id === parseInt(id));
};

const generateId = () => {
    const newsList = getNews();
    return newsList.length > 0 ? Math.max(...newsList.map(n => n.id)) + 1 : 1;
};

const loadNewsData = (news) => {
    document.getElementById('newsId').value = news.id;
    document.getElementById('name').value = news.name;
    document.getElementById('description').value = news.description;
    document.getElementById('imageSrc').value = news.imageSrc;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const imageSrc = formData.get('imageSrc');
    
    if (!name || !description || !imageSrc) {
        showError('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    try {
        const newsList = getNews();
        
        if (isEditMode && editingNewsId) {
            // Modo de edição
            const newsIndex = newsList.findIndex(n => n.id === parseInt(editingNewsId));
            
            if (newsIndex === -1) {
                showError('Notícia não encontrada!');
                return;
            }
            
            const existingNews = newsList[newsIndex];
            
            newsList[newsIndex] = {
                ...existingNews,
                name: name.trim(),
                description: description.trim(),
                imageSrc: imageSrc.trim()
            };
            
            saveNews(newsList);
            
        } else {
            // Modo de criação
            const newNews = {
                id: generateId(),
                name: name.trim(),
                description: description.trim(),
                imageSrc: imageSrc.trim()
            };
            
            newsList.push(newNews);
            saveNews(newsList);
        }
        
        window.location.hash = '/admin/news';
        
    } catch (error) {
        console.error('Erro ao salvar notícia:', error);
        showError('Erro ao salvar notícia. Tente novamente!');
    }
};

export const render = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login';
        return;
    }
    
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const newsId = urlParams.get('id');
    
    // Determinar se está em modo de edição ou criação
    isEditMode = hash.includes('/admin/news/edit') && newsId;
    editingNewsId = newsId;
    
    const formTitle = document.getElementById('formTitle');
    
    if (isEditMode) {
        // Modo de edição
        const news = getNewsById(newsId);
        
        if (!news) {
            alert('Notícia não encontrada!');
            window.location.hash = '/admin/news';
            return;
        }
        
        if (formTitle) {
            formTitle.textContent = 'Atualizar Notícia';
        }
        
        loadNewsData(news);
        
    } else {
        // Modo de criação
        if (formTitle) {
            formTitle.textContent = 'Criar Notícia';
        }
    }
    
    // Configurar evento de submit
    const form = document.getElementById('newsForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
};
