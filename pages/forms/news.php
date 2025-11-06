<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <?php include dirname(__DIR__, 1) . '/partials/head.php'; ?>
    <link rel="stylesheet" href="<?= base_url('style/admin.css') ?>">
    <title>Página administração de notícias</title>
</head>

<body>
    <?php 
        $isUpdate = isset($_GET['id']) && $_GET['url'] == 'admin/news/update';
    ?>
    <main class="form-wrapper">
        <div class="form-container">
            <header class="flex-row align-center">
                <a href="<?php echo base_url('admin/news') ?>">
                    <i class="fa-solid fa-arrow-left"></i>
                </a>
                <h1 class="heading"><?= $isUpdate ? 'Atualizar Notícia' : 'Criar Notícia'; ?></h1>
            </header>

            <?php if (isset($_SESSION['error'])): ?>
                        <p class="text-small" style="color: red; text-align: center; margin-block: 1rem;"><?php echo $_SESSION['error']; ?></p>
                        <?php unset($_SESSION['error']); ?>
                    <?php endif; ?>

            <form enctype="multipart/form-data" class="content-wrapper-size flex-column flex-center" action="" method="POST">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder="Insira o nome da notícia" value="<?= $isUpdate ? $news->getName() : ''; ?>" required>
                </div>

                <div class="form-group">
                    <label for="description">Descrição</label>
                    <textarea name="description" id="description" placeholder="Insira a descrição da notícia" required><?= $isUpdate ? $news->getDescription() : ''; ?></textarea>
                </div>

                <div class="form-group">
                    <label for="image">Carregamento de imagem</label>
                    <input type="file" name="image" id="image" required>
                </div>

                <button type="submit" class="btn-primary">Salvar</button>
            </form>
        </div>
    </main>
</body>

</html>