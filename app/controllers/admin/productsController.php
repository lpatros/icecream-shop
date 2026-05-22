<?php
require_once __DIR__ .  '/adminController.php';

require_once '../app/dao/productsDAO.php';
require_once '../app/model/product.php';

class ProductsController extends AdminController
{
    private $productsDAO;
    private $uploadDir = 'uploads/products/';

    public function __construct(PDO $db)
    {
        parent::__construct($db); // Chama o banco, inSession() e logout()
        $this->productsDAO = new ProductsDAO($this->db);
    }

    public function products()
    {
        require_once '../app/model/product.php';
        require_once '../app/dao/productsDAO.php';

        $this->productsDAO = new ProductsDAO($this->db);
        $productList = $this->productsDAO->getProducts();

        require_once '../app/views/admin/products.php';
    }

    public function create()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $name = $_POST['name'];
                $description = $_POST['description'];
                $price = $_POST['price'];
                $imageDestination = $this->saveImage($_FILES['image'], $this->uploadDir);
                $this->productsDAO->createProduct($name, $description, $price, $imageDestination);
                header('Location: ' . base_url('admin/products'));
            }
            require_once '../app/views/forms/products.php';
        } catch (Exception $e) {
            $_SESSION['error'] = $e->getMessage();
            header('Location: ' . base_url('admin/products/create'));
        }
    }

    public function update()
    {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            $product = $this->productsDAO->getProductById($id);

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $name = $_POST['name'];
                $description = $_POST['description'];
                $price = $_POST['price'];
                $imageSrc = $_POST['imageSrc'];

                $this->productsDAO->update($id, $name, $description, $price, $imageSrc);
                header('Location: ' . base_url('admin/products'));
            }
            require_once '../app/views/forms/products.php';
        }
    }

    public function delete()
    {
        $url = 'admin/products';

        if (!isset($_GET['id'])) {
            header('Location: ' . base_url($url));
            return;
        }

        $id = $_GET['id'];

        if (isset($_GET['confirm'])) {
            $product = $this->productsDAO->getProductById($id);

            $this->productsDAO->delete($id);

            $this->deleteImage($product->imageSrc());

            header('Location: ' . base_url($url));
        }

        require_once '../app/views/partials/confirmDelete.php';
    }
}
