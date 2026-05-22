<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <?php include dirname(__DIR__, 1) . '/partials/head.php'; ?>
    <link rel="stylesheet" href="<?= base_url('style/admin.css') ?>">
    <title>Página administração de Produtos</title>
</head>

<body>
    <?php
    $isUpdate = isset($_GET['id']) && $_GET['url'] == 'admin/products/update';
    ?>
    <main class="form-wrapper">
        <div class="form-container">
            <header class="flex-row align-center">
                <a href="<?php echo base_url('admin/products') ?>">
                    <i class="fa-solid fa-arrow-left"></i>
                </a>
                <h1 class="heading"><?= $isUpdate ? 'Atualizar Produto' : 'Criar Produto'; ?></h1>
            </header>

            <?php if (isset($_SESSION['error'])): ?>
                <p class="text-small" style="color: red; text-align: center; margin-block: 1rem;"><?php echo $_SESSION['error']; ?></p>
                <?php unset($_SESSION['error']); ?>
            <?php endif; ?>

            <form enctype="multipart/form-data" class="content-wrapper-size flex-column flex-center" action="" method="POST">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" name="name" id="name" placeholder="Insira o nome do produto" value="<?= $isUpdate ? $product->getName() : ''; ?>" required>
                </div>

                <div class="form-group">
                    <label for="description">Descrição</label>
                    <input type="text" name="description" id="description" placeholder="Insira a descrição" value="<?= $isUpdate ? $product->getDescription() : ''; ?>" required>
                </div>
                <div class="form-group">
                    <label for="price">Preço</label>
                    <input type="number" name="price" id="price" placeholder="Insira o preço do produto" value="<?= $isUpdate ? $product->getPrice() : ''; ?>" required step="0.01">
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