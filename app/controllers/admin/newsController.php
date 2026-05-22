<?php
require_once __DIR__ .  '/adminController.php';

require_once '../app/dao/newsDAO.php';
require_once '../app/model/news.php';

class NewsController extends AdminController
{
    private $newsDAO;
    private $uploadDir = 'uploads/news/';

    public function __construct(PDO $db)
    {
        parent::__construct($db); // Chama o banco, inSession() e logout()
        $this->newsDAO = new NewsDAO($this->db);
    }

    public function news()
    {
        require_once '../app/model/news.php';
        require_once '../app/dao/newsDAO.php';

        $this->newsDAO = new NewsDAO($this->db);
        $NewsList = $this->newsDAO->getNews();

        require_once '../app/views/admin/news.php';
    }

    public function create()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $name = $_POST['name'];
                $description = $_POST['description'];
                $imageDestination = $this->saveImage($_FILES['image'], $this->uploadDir);
                $this->newsDAO->create($name, $description, $imageDestination);
                header('Location: ' . base_url('admin/news'));
            }

            require_once '../app/views/forms/news.php';
        } catch (Exception $e) {
            $_SESSION['error'] = $e->getMessage();
            header('Location: ' . base_url('admin/news/create'));
        }
    }

    public function update()
    {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            $news = $this->newsDAO->getNewsById($id);

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $name = $_POST['name'];
                $description = $_POST['description'];
                $imageSrc = $_POST['imageSrc'];

                $this->newsDAO->update($id, $name, $description, $imageSrc);
                header('Location: ' . base_url('admin/news'));
            }
            require_once '../app/views/forms/news.php';
        }
    }

    public function delete()
    {
        $url = 'admin/news';

        if (!isset($_GET['id'])) {
            header('Location: ' . base_url($url));
            return;
        }

        $id = $_GET['id'];

        if (isset($_GET['confirm'])) {
            $news = $this->newsDAO->getNewsById($id);

            $this->newsDAO->delete($id);

            $this->deleteImage($news->imageSrc());

            header('Location: ' . base_url($url));
        }
        require_once '../app/views/partials/confirmDelete.php';
    }
}
