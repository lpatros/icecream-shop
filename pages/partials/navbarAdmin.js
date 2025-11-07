import { logout } from '../../util/authUtils.js';

const createAdminNavbar = () => {
    const nav = document.createElement('nav');
    nav.className = 'flex-column nav-admin flex-center';
    
    const currentPath = window.location.hash.substring(1).split('?')[0];
    
    const getButtonClass = (path) => {
        return currentPath === path ? 'btn-secondary' : 'btn-primary';
    };
    
    nav.innerHTML = `
        <div class="flex-column flex-start">
            <a class="text-regular ${getButtonClass('/admin/products')}" href="#/admin/products">
                <i class="fa-solid fa-ice-cream"></i>
                Produtos
            </a>
            <a class="text-regular ${getButtonClass('/admin/news')}" href="#/admin/news">
                <i class="fa-solid fa-newspaper"></i>
                Novidades
            </a>
            <a class="text-regular ${getButtonClass('/admin/users')}" href="#/admin/users">
                <i class="fa-solid fa-user"></i>
                Admins
            </a>
            <a class="text-regular btn-primary" href="#" id="logoutBtn">
                <i class="fa-solid fa-right-from-bracket"></i>
                Sair
            </a>
        </div>
    `;
    
    return nav;
}

function attachLogoutHandler() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

export const render = () => {
    
    const navbarContainer = document.getElementById('importNavbarAdmin');
    
    if (navbarContainer) {
        const navbar = createAdminNavbar();
        navbarContainer.innerHTML = '';
        navbarContainer.appendChild(navbar);
        
        attachLogoutHandler();
    }
};