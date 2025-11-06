<?php

require_once '../app/model/news.php';
require_once '../app/dao/newsDAO.php';

class NewsController
{
    private $db;
    private $productsDAO;
    private $newsDAO;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function news()
    {
        require_once '../app/model/product.php';
        require_once '../app/dao/productsDAO.php';

        $this->productsDAO = new ProductsDAO($this->db);
        $newerProducts = $this->productsDAO->getProducts(2);

        $this->newsDAO = new NewsDAO($this->db);
        $newerNews = $this->newsDAO->getNews();

        require_once '../app/views/news.php';
    }

    public function more()
    {
        $this->newsDAO = new NewsDAO($this->db);

        $newId = $_GET['id'] ?? null;
        if (!$newId) {
            header('Location: ' . base_url('news'));
            exit;
        }

        $new = $this->newsDAO->getNewsById($newId);
        if (!$new) {
            header('Location: ' . base_url('news'));
            exit;
        }

        require_once '../app/views/moreNews.php';
    }
}
