const footerHTML = `
    <div class="content-wrapper-size footer-wrapper">
        <div>
            <p>Todos os direitos reservados</p>
            <p>2025</p>

            <div class="social-media-wrapper">
                <a href="https://github.com">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.instagram.com/">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>

        </div>

        <div class="logo-wrapper">
            <h1 class="heading styled-font">Fábrica de Delícias</h1>
            <h2 class="subheading">Sonhos gelados feitos com amor</h2>
        </div>
    </div>
`;

export const render = () => {
    const footer = document.querySelector('footer');
    
    if (footer) {
        footer.innerHTML = footerHTML;
    }
}