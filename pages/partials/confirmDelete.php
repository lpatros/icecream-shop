<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <?php include __DIR__ . '/head.php'; ?>
    <link rel="stylesheet" href="<?= base_url('style/admin.css') ?>">
    <title>Pagina de Confirmação de exclusão</title>
</head>
<body>
    <main class="form-wrapper">
        <div class="form-container">
            <header class="flex-row flex-center">
                <h1 class="heading">Tem certeza?</h1>
            </header>
            <div class="content-wrapper-size flex-column flex-center">
                <p class="text-regular">Você está prestes a excluir. Esta ação não pode ser desfeita.</p>
                <a href="<?= base_url($url); ?>" class="btn-primary">Cancelar</a>
                <a href="?id=<?= $id; ?>&confirm" class="btn-danger-ghost">Excluir</a>
            </div>
        </div>
    </main>
</body>
</html>