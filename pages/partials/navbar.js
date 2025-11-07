const navbar = document.querySelector('#importNavbar');

const navbarHTML = `
    <div id="navbar-wrapper">
        <div id="navbar-content-wrapper">
            <picture>
                <img src="../../../public/assets/logo.png" alt="">
            </picture>
            <nav id="top-navbar" class="content-wrapper-size">
                <a class="text-regular btn-primary" href="">Inicio</a>
                <a class="text-regular btn-primary" href="../about">Sobre</a>
                <a class="text-regular btn-primary" href="../products">Sorvetes</a>
                <a class="text-regular btn-primary" href="../news">Novidades</a>
                <a class="text-regular btn-primary" href="../admin">Entrar</a>

                <button class="close-mobile-nav btn-ghost flex-column" type="button">
                    <i class="fas fa-chevron-left"></i>
                </button>
            </nav>
        </div>
    </div>

    <div id="navbar-mobile" style="align-items: center;">
        <button id="navbar-button-toggle" class="btn-primary flex-column" type="button">
            <i class="fa-solid fa-bars"></i>
        </button>

        <picture>
            <img src="../../../public/assets/logo.png" alt="">
        </picture>
    </div>
`;

if (navbar) {
    navbar.innerHTML = navbarHTML;
}

window.onload = function () {

    const navbarToggle = document.querySelector('#navbar-button-toggle');
    const closeNavbarToggle = document.querySelector('.close-mobile-nav');
    const navbarWrapper = document.querySelector('#navbar-wrapper');

    closeNavbarToggle.addEventListener('click', function () {
        navbarWrapper.classList.toggle('toggled');
    })

    navbarToggle.addEventListener('click', function () {
        navbarWrapper.classList.toggle('toggled');
    })


    const throttleTimeout = 100;
    let lastScroll = Date.now();

    window.addEventListener('scroll', function () {
        const now = Date.now();
        if (now - lastScroll < throttleTimeout) {
            return;
        }

        lastScroll = now;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // console.log(scrollPosition);

        if (scrollPosition > 200) {
            navbarWrapper.classList.add('scrolled');
            return;
        }

        navbarWrapper.classList.remove('scrolled');
    })
}