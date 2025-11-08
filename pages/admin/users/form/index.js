import { isAuthenticated } from "../../../../util/authUtils.js";
import { getUsers, saveUsers } from "../../../../util/localStorageUtils.js";

export const partials = ['navbarAdmin'];

let isEditMode = false;
let editingUserId = null;

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

const getUserById = (id) => {
    const users = getUsers();
    return users.find(user => user.id === parseInt(id));
};

const generateId = () => {
    const users = getUsers();
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const checkEmailExists = (email, excludeUserId = null) => {
    const users = getUsers();
    return users.some(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.id !== excludeUserId
    );
};

const loadUserData = (user) => {
    document.getElementById('userId').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;
    document.getElementById('password-confirmation').value = user.password;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirmation = formData.get('password-confirmation');
    
    // Validações
    if (!name || !email || !password || !passwordConfirmation) {
        showError('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Por favor, insira um e-mail válido!');
        return;
    }
    
    if (password.length < 8) {
        showError('A senha deve ter no mínimo 8 caracteres!');
        return;
    }
    
    if (password !== passwordConfirmation) {
        showError('As senhas não coincidem!');
        return;
    }
    
    // Verificar se o e-mail já existe
    const excludeId = isEditMode && editingUserId ? parseInt(editingUserId) : null;
    if (checkEmailExists(email, excludeId)) {
        showError('Este e-mail já está cadastrado!');
        return;
    }
    
    try {
        const users = getUsers();
        
        if (isEditMode && editingUserId) {
            // Modo de edição
            const userIndex = users.findIndex(u => u.id === parseInt(editingUserId));
            
            if (userIndex === -1) {
                showError('Usuário não encontrado!');
                return;
            }
            
            const existingUser = users[userIndex];
            
            users[userIndex] = {
                ...existingUser,
                name: name.trim(),
                email: email.trim(),
                password: password
            };
            
            saveUsers(users);
            
        } else {
            // Modo de criação
            const newUser = {
                id: generateId(),
                name: name.trim(),
                email: email.trim(),
                password: password
            };
            
            users.push(newUser);
            saveUsers(users);
        }
        
        window.location.hash = '/admin/users';
        
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        showError('Erro ao salvar usuário. Tente novamente!');
    }
};

export const render = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login';
        return;
    }
    
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const userId = urlParams.get('id');
    
    // Determinar se está em modo de edição ou criação
    isEditMode = hash.includes('/admin/users/edit') && userId;
    editingUserId = userId;
    
    const formTitle = document.getElementById('formTitle');
    
    if (isEditMode) {
        // Modo de edição
        const user = getUserById(userId);
        
        if (!user) {
            alert('Usuário não encontrado!');
            window.location.hash = '/admin/users';
            return;
        }
        
        if (formTitle) {
            formTitle.textContent = 'Atualizar Admin';
        }
        
        loadUserData(user);
        
    } else {
        // Modo de criação
        if (formTitle) {
            formTitle.textContent = 'Criar Admin';
        }
    }
    
    // Configurar evento de submit
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
};
