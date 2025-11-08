import { isAuthenticated, getCurrentUser } from "../../../util/authUtils.js";
import { getUsers } from "../../../util/localStorageUtils.js";

export const partials = [
    'navbarAdmin'
];

const renderUsersTable = () => {
    const users = getUsers();
    const tableBody = document.getElementById('usersTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem;">
                    Nenhum admin cadastrado
                </td>
            </tr>
        `;
        return;
    }
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td class="flex-row flex-center">
                <a class="btn-danger icon-button" href="#/admin/users/delete?id=${user.id}" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </a>
                <a class="icon-button" href="#/admin/users/edit?id=${user.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </a>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

export const render = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login?expired=true';
        return;
    }
    
    const user = getCurrentUser();
    const userNameElement = document.getElementById('userName');
    if (userNameElement && user) {
        userNameElement.textContent = user.name;
    }

    if (window.location.hash.includes('selfDelete=true')) {
        const errorMessageElement = document.getElementById('errorMessage');
        if (errorMessageElement) {
            errorMessageElement.textContent = 'Você não pode excluir o seu próprio usuário!';
            errorMessageElement.style.display = 'block';
        }
    }
    
    renderUsersTable();
};