import { isAuthenticated, getCurrentUser } from "../../../util/authUtils.js";
import { getProducts } from "../../../util/localStorageUtils.js";

export const partials = [
    'navbarAdmin'
];

const renderProductsTable = () => {
    const products = getProducts();
    const tableBody = document.getElementById('productsTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem;">
                    Nenhum produto cadastrado
                </td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>R$ ${parseFloat(product.price).toFixed(2)}</td>
            <td class="flex-row flex-center">
                <a class="btn-danger icon-button" href="#/admin/products/delete?id=${product.id}" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                </a>
                <a class="icon-button" href="#/admin/products/edit?id=${product.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </a>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

export const render = () => {
    if (!isAuthenticated()) {
        window.location.hash = '/admin/login';
        return;
    }
    
    const user = getCurrentUser();
    const userNameElement = document.getElementById('userName');
    if (userNameElement && user) {
        userNameElement.textContent = user.name;
    }
    
    renderProductsTable();
};