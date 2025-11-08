/**
 * Cria uma configuração de rota automaticamente
 * @param {string} path - Caminho da rota
 * @param {Object} overrides - Sobrescritas opcionais (html, css, js)
 * @returns {Object} Configuração da rota
 */
const createRoute = (path, overrides = {}) => {
    const pagePath = `/pages${path}`;
    const pageName = path.split('/').pop();
    
    return {
        html: pagePath,
        css: `/css/${pageName}.css`,
        js: `${pagePath}/index.js`,
        ...overrides
    };
}

export const routes = {
    '/home': createRoute('/home'),
    '/about': createRoute('/about'),
    '/products': createRoute('/products'),
    '/news': createRoute('/news'),
    '/news/more': createRoute('/news/more', { css: null }),
    '/admin/login': createRoute('/admin/login', { css: '/css/login.css' }),
    '/admin/products': createRoute('/admin/products', { css: '/css/admin.css' }),
    '/admin/news': createRoute('/admin/news', { css: '/css/admin.css' }),
    '/admin/users': createRoute('/admin/users', { css: '/css/admin.css' }),
    '/404': createRoute('/404', { css: null })
};