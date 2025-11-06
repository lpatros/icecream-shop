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