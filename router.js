import { initializeLocalStorage } from './util/localStorageUtils.js';
import { routes } from './util/routes.js';

const rootContent = document.getElementById('root-content');
const DEFAULT_ROUTE = '/home';
const NOT_FOUND_ROUTE = '/404';

const loadStyle = (cssPath) => {
    document.getElementById('page-style')?.remove();
    
    if (!cssPath) return;

    const link = document.createElement('link');
    Object.assign(link, {
        id: 'page-style',
        rel: 'stylesheet',
        href: cssPath
    });
    document.head.appendChild(link);
}

const loadPartial = async (partialName) => {
    try {
        const partialModule = await import(`/pages/partials/${partialName}.js`);
        partialModule.render?.();

    } catch (error) {
        console.error(`Erro ao carregar partial ${partialName}:`, error);
    }
};

const loadScript = async (jsPath) => {
    try {
        const module = await import(jsPath);

        if (module.partials?.length) {
            await Promise.all(module.partials.map(loadPartial));
        }

        module.render?.();
    } catch (error) {
        console.error('Erro ao carregar script:', error);
    }
}

const fetchPageHtml = async (routeConfig) => {
    const response = await fetch(routeConfig.html);
    if (!response.ok) throw new Error('Página não encontrada');
    return response.text();
};

const renderPage = async (routeConfig, html) => {
    rootContent.innerHTML = html;
    loadStyle(routeConfig.css);
    await loadScript(routeConfig.js);
};

const load404Page = async () => {
    try {
        const html = await fetchPageHtml(routes[NOT_FOUND_ROUTE]);
        await renderPage(routes[NOT_FOUND_ROUTE], html);

    } catch {
        rootContent.innerHTML = '<h1>Erro 404: Página não encontrada</h1>';
    }
};

const loadContent = async (path) => {

    path = path.split('?')[0];

    const routeConfig = routes[path] || routes[NOT_FOUND_ROUTE];

    try {
        const html = await fetchPageHtml(routeConfig);
        await renderPage(routeConfig, html);

    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        await load404Page();
    }
}

const handleRouting = () => {
    const { pathname, hash } = window.location;

    if (pathname === '/index.html') {
        window.location.href = '/';
        return;
    }

    if (pathname === '/' && !hash) {
        window.location.hash = DEFAULT_ROUTE;
        return;
    }

    const hashPath = hash.substring(1) || DEFAULT_ROUTE;
    loadContent(hashPath);
};

const initializeApp = () => {
    initializeLocalStorage();
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('DOMContentLoaded', handleRouting);
};

initializeApp();