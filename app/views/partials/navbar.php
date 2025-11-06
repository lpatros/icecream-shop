<div id="navbar-wrapper">
    <div id="navbar-content-wrapper">
        <picture>
            <img src="<?= base_url('assets/logo.png'); ?>" alt="">
        </picture>
        <nav id="top-navbar" class="content-wrapper-size">
            <a class="text-regular btn-primary" href="<?php echo base_url(''); ?>">Inicio</a>
            <a class="text-regular btn-primary" href="<?php echo base_url('about'); ?>">Sobre</a>
            <a class="text-regular btn-primary" href="<?php echo base_url('products'); ?>">Sorvetes</a>
            <a class="text-regular btn-primary" href="<?php echo base_url('news'); ?>">Novidades</a>
            <a class="text-regular btn-primary" href="<?php echo base_url('admin'); ?>">Entrar</a>

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
        <img src="<?= base_url('assets/logo.png'); ?>" alt="">
    </picture>
</div>