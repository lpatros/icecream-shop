<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <?php include 'partials/head.php'; ?>
    <link rel="stylesheet" href="<?= base_url('style/global.css') ?>">
    <title>Pagina não encontrada (404)</title>
</head>

<body>
    <?php include 'partials/navbar.php'; ?>
    <main>
        <article class="content-wrapper-size height-80vh">
            <div class="flex-column flex-center height-80vh">
                <h1 class="heading">Página não encontrada (404)</h1>
                <p class="text-small">Desculpe, a página que você está procurando não existe ou foi removida.</p>
                <a href="<?= base_url('') ?>" class="btn-primary">Pagina Inicial</a>
            </div>
        </article>
    </main>
    <?php include 'partials/footer.php'; ?>
</body>

</html>