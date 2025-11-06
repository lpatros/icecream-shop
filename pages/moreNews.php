<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <?php include 'partials/head.php'; ?>
    <link rel="stylesheet" href="<?= base_url('style/global.css') ?>">
    <title>Novidade: <?php $new->getName(); ?></title>
</head>

<body>
    <?php include 'partials/navbar.php'; ?>
    <main>
        <article class="shop-wrapper">
            <div class="text-wrapper">
                <h1 class="heading"><?= $new->getName(); ?></h1>
                <p class="text-regular"><?= $new->getDescription(); ?></p>
                <a href="<?= base_url('news'); ?>" class="btn-primary">Voltar</a>
            </div>
            <picture>
                <img src="<?= base_url($new->ImageSrc()); ?>" alt="">
            </picture>
        </article>
    </main>
    <?php include 'partials/footer.php'; ?>
</body>

</html>