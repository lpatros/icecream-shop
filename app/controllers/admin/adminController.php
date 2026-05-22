<?php

require_once '../app/model/user.php';
require_once '../app/dao/usersDAO.php';

class AdminController
{
    protected $db;
    private $usersDAO;
    protected $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

    public function __construct(PDO $db)
    {
        $this->db = $db;
        $this->inSession();
        $this->logout();
    }

    public function admin()
    {
        header('Location: ' . base_url('admin/login'));
    }

    private function inSession()
    {
        $loginUrl = 'admin/login';
        $currentUrl = $_GET['url'];

        session_start();

        if (!isset($_SESSION['user'])) {
            if ($currentUrl != $loginUrl) {
                header('Location: ' . base_url($loginUrl));
                exit();
            }
            return;
        }

        // Entao o usuário está logado

        $maxTime = 120; // 2 minutos
        if (isset($_SESSION['last_time']) && (time() - $_SESSION['last_time']) > $maxTime) {
            session_unset();
            session_destroy();
            header('Location: ' . base_url($loginUrl . '?expired'));
            exit();
        }

        // Se o usuário está logado e a sessão não expirou, verifica se ele existe no banco

        $this->usersDAO = new UsersDAO($this->db);
        $user = $this->usersDAO->login($_SESSION['user']['email'], $_SESSION['user']['password']);

        if (!$user) {
            session_unset();
            session_destroy();
            header('Location: ' . base_url($loginUrl . '?incorrect'));
            exit();
        }

        // Se está logado e a sessão não expirou, mas a URL atual é a de login, vai pra produtos
        $_SESSION['last_time'] = time();

        if ($currentUrl == $loginUrl) {
            header('Location: ' . base_url('admin/products'));
            exit();
        }
    }

    public function logout()
    {
        if (isset($_GET['logout'])) {
            session_unset();
            session_destroy();
            header('Location: ' . base_url('admin/login'));
            exit();
        }
    }

    protected function saveImage($file, $uploadDir)
    {
        $fileExt = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (!in_array($fileExt, $this->allowedExtensions)) {
            throw new Exception('Formato de imagem inválido', 400);
        }

        $imageName = uniqid() . '.' . $fileExt;
        $temporaryFile = $file['tmp_name'];

        $absoluteUploadDir = $_SERVER['DOCUMENT_ROOT'] . '/a4-app-internet/public/' . $uploadDir;

        if (!file_exists($absoluteUploadDir)) {
            mkdir($absoluteUploadDir, 0777, true);
        }

        $fullUploadPath = $absoluteUploadDir . $imageName;
        if (!move_uploaded_file($temporaryFile, $fullUploadPath)) {
            // $error = error_get_last();
            $error = "Erro ao salvar o arquivo. Verifique as permissões do diretório.";

            throw new Exception('Erro ao fazer upload da imagem' . json_encode($error), 500);
        }

        return $uploadDir . $imageName;
    }

    protected function deleteImage($imageSrc)
    {
        $absolutePath = $_SERVER['DOCUMENT_ROOT'] . '/a4-app-internet/public/' . $imageSrc;

        if (!file_exists($absolutePath)) {
            throw new Exception('Imagem não encontrada', 404);
        }

        if (!unlink($absolutePath)) {
            throw new Exception('Erro ao excluir a imagem', 500);
        }
    }
}
