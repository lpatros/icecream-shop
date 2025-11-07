import { initializeLocalStorage } from './util/localStorageUtils.js';

const rootContent = document.getElementById('root-content');

const routes = {
    '/home': {
        "html": '/pages/home',
        "css": '/css/home.css',
        "js": '/pages/home/index.js'
    },
    '/about': {
        "html": '/pages/about',
        "css": '/css/about.css',
        "js": '/pages/about/index.js'
    },
    '/products': {
        "html": '/pages/products',
        "css": '/css/products.css',
        "js": '/pages/products/index.js'
    },
    '/news': {
        "html": '/pages/news',
        "css": '/css/news.css',
        "js": '/pages/news/index.js'
    },
    '/news/more': {
        "html": '/pages/news/more',
        "js": '/pages/news/more/index.js'
    },
    '/admin/login': {
        "html": '/pages/admin/login',
        "css": '/css/login.css',
        "js": '/pages/admin/login/index.js'
    },
    '/admin/products': {
        "html": '/pages/admin/products',
        "css": '/css/admin.css',
        "js": '/pages/admin/products/index.js'
    },
    '/admin/news': {
        "html": '/pages/admin/news',
        "css": '/css/admin.css',
        "js": '/pages/admin/news/index.js'
    },
    '/admin/users': {
        "html": '/pages/admin/users',
        "css": '/css/admin.css',
        "js": '/pages/admin/users/index.js'
    },
    '/404': {
        "html": '/pages/404',
        "js": '/pages/404/index.js'
    }
};

const loadStyle = (cssPath) => {

    const oldStyle = document.getElementById('page-style');
    if (oldStyle) {
        oldStyle.remove();
    }

    if (!cssPath) return;

    const link = document.createElement('link');
    link.id = 'page-style';
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);

    // console.log(`Estilo carregado: ${cssPath}`);
}

const loadScript = async (jsPath) => {
    try {
        const module = await import(jsPath);

        if (module.partials) {
            for (const partial of module.partials) {
                const partialPath = `/pages/partials/${partial}.js`;
                const partialModule = await import(partialPath);

                if (partialModule.render) {
                    partialModule.render();
                }

                // console.log(`Partial carregado: ${partialPath}`);
            }
        }

        if (module.render) {
            module.render();
            // console.log(`Script carregado e renderizado: ${jsPath}`);
        }

    } catch (error) {
        console.error('Erro ao carregar script:', error);
    }
}

const loadContent = async (path) => {

    path = path.split('?')[0];

    if (!routes[path]) {
        path = '/404';
    }

    const defaultRoute = '/home';
    const file = routes[path] || routes[defaultRoute];

    try {
        const response = await fetch(file.html);

        if (!response.ok) {
            throw new Error('Página não encontrada');
        }

        const html = await response.text();

        rootContent.innerHTML = html;

        // console.log(`Conteúdo carregado: ${file.html}`);

        loadStyle(file.css);

        loadScript(file.js);

    } catch (error) {

        console.error('Erro ao carregar conteúdo:', error);

        const errorPageResponse = await fetch(routes['/404'].html);
        loadStyle(routes['/404'].css);
        loadScript(routes['/404'].js);

        if (!errorPageResponse.ok) {
            rootContent.innerHTML = '<h1>Erro 404: Página não encontrada</h1>';
            return;
        }

        const errorPageHtml = await errorPageResponse.text();
        rootContent.innerHTML = errorPageHtml;
    }
}

const handleRouting = () => {

    const path = window.location.pathname;

    if (path === '/index.html') {
        window.location.href = '/';
        return;
    }

    if (path === '/' && !window.location.hash) {
        window.location.hash = '/home';
        return;
    }

    const hashPath = window.location.hash.substring(1) || '/home';
    loadContent(hashPath);
}

// Inicializa o LocalStorage com os dados mock na primeira carga
initializeLocalStorage();

window.addEventListener('hashchange', handleRouting);

window.addEventListener('DOMContentLoaded', handleRouting);