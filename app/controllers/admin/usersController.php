<?php
require_once __DIR__ .  '/adminController.php';

require_once '../app/dao/usersDAO.php';
require_once '../app/model/user.php';

class usersController extends AdminController
{
    private $usersDAO;

    public function __construct(PDO $db)
    {
        parent::__construct($db); // Chama o banco, inSession() e logout()
        $this->usersDAO = new UsersDAO($this->db);
    }

    public function users()
    {
        $usersList = $this->usersDAO->getUsers();
        require_once '../app/views/admin/users.php';
    }

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            // TODO: Modificar para criar um objeto User e passar para o DAO
            $this->usersDAO->createUser($name, $email, $password);
            header('Location: ' . base_url('admin/users'));
        }
        require_once '../app/views/forms/users.php';
    }

    public function update()
    {
        if (!isset($_GET['id'])) {
            return;
        }

        $id = $_GET['id'];

        $user = $this->usersDAO->getUserById($id);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            $this->usersDAO->updateUser($id, $name, $email, $password);

            $_SESSION['user']['name'] = $name;
            $_SESSION['user']['email'] = $email;
            $_SESSION['user']['password'] = $password;

            header('Location: ' . base_url('admin/users'));
        }
        require_once '../app/views/forms/users.php';
    }

    public function delete()
    {
        $url = 'admin/users';

        if (!isset($_GET['id'])) {
            header('Location: ' . base_url($url));
            return;
        }

        $id = $_GET['id'];

        if ($id == $_SESSION['user']['id']) {
            $_SESSION['error'] = 'Você não pode excluir a si mesmo!';
            header('Location: ' . base_url($url));
            return;
        }

        if (isset($_GET['confirm'])) {
            $this->usersDAO->deleteUser($id);
            header('Location: ' . base_url($url));
        }

        require_once '../app/views/partials/confirmDelete.php';
    }
}
