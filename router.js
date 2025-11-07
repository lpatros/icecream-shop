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
        "js": '/pages/about/about.js'
    },
    '/404': {
        "html": '/pages/404',
        "css": '/css/404.css',
        "js": '/pages/404/404.js'
    }
};

const loadStyle = (cssPath) => {

    const oldStyle = document.getElementById('page-style');
    if (oldStyle) {
        oldStyle.remove();
    }

    const link = document.createElement('link');
    link.id = 'page-style';
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

const loadScript = async (jsPath) => {
    try {
        const module = await import(jsPath);

        if (module.partials) {
            for (const partial of module.partials) {
                const partialPath = `/pages/partials/${partial}.js`;
                await import(partialPath);
            }
        }

        if (module.render) {
            module.render();
        }
        
    } catch (error) {
        console.error('Erro ao carregar script:', error);
    }
}

const loadContent = async (path) => {
    
    const defaultRoute = '/home';
    const file = routes[path] || routes[defaultRoute];

    try {
        const response = await fetch(file.html);

        if (!response.ok) {
            throw new Error('Página não encontrada');
        }

        const html = await response.text();

        rootContent.innerHTML = html;

        loadStyle(file.css);

        loadScript(file.js);

    } catch (error) {

        console.error('Erro ao carregar conteúdo:', error);

        const errorPageResponse = await fetch(routes['/404'].html);

        if (!errorPageResponse.ok) {
            rootContent.innerHTML = '<h1>Erro 404: Página não encontrada</h1>';
            return;
        }

        const errorPageHtml = await errorPageResponse.text();
        rootContent.innerHTML = errorPageHtml;
    }
}

const handleRouting = () =>{

    const path = window.location.pathname;

    if (path === '/index.html') {
        window.location.href = '/';
        return;
    }

    if (path === '/') {
        window.location.hash = '/home';
    } 

    const hashPath = window.location.hash.substring(1) || '/home'; 
    loadContent(hashPath);
}

window.addEventListener('hashchange', handleRouting);

window.addEventListener('DOMContentLoaded', handleRouting);