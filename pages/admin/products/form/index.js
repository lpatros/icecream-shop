import { isAuthenticated } from "../../../../util/authUtils.js";
import { getProducts, saveProducts } from "../../../../util/localStorageUtils.js";

let isEditMode = false;
let editingProductId = null;

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

const getProductById = (id) => {
    const products = getProducts();
    return products.find(product => product.id === parseInt(id));
};

const generateId = () => {
    const products = getProducts();
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

const loadProductData = (product) => {
    document.getElementById('productId').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('imageSrc').value = product.imageSrc;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const imageSrc = formData.get('imageSrc');
    
    if (!name || !description || !price || !imageSrc) {
        showError('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    try {
        const products = getProducts();
        
        if (isEditMode && editingProductId) {
            // Modo de edição
            const productIndex = products.findIndex(p => p.id === parseInt(editingProductId));
            
            if (productIndex === -1) {
                showError('Produto não encontrado!');
                return;
            }
            
            const existingProduct = products[productIndex];
            
            products[productIndex] = {
                ...existingProduct,
                name: name.trim(),
                description: description.trim(),
                price: parseFloat(price),
                imageSrc: imageSrc.trim()
            };
            
            saveProducts(products);
            
        } else {
            // Modo de criação
            const newProduct = {
                id: generateId(),
                name: name.trim(),
                description: description.trim(),
                price: parseFloat(price),
                imageSrc: imageSrc.trim()
            };
            
            products.push(newProduct);
            saveProducts(products);
        }
        
        window.location.hash = '/admin/products';
        
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        showError('Erro ao salvar produto. Tente novamente!');
    }
};

export const render = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login';
        return;
    }
    
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const productId = urlParams.get('id');
    
    // Determinar se está em modo de edição ou criação
    isEditMode = hash.includes('/admin/products/edit') && productId;
    editingProductId = productId;
    
    const formTitle = document.getElementById('formTitle');
    
    if (isEditMode) {
        // Modo de edição
        const product = getProductById(productId);
        
        if (!product) {
            window.location.hash = '/admin/products';
            return;
        }
        
        if (formTitle) {
            formTitle.textContent = 'Atualizar Produto';
        }
        
        loadProductData(product);
        
    } else {
        // Modo de criação
        if (formTitle) {
            formTitle.textContent = 'Criar Produto';
        }
    }
    
    // Configurar evento de submit
    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
};
