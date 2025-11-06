<?php

class NewsDAO
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getNewsById(int $id)
    {
        try {
            $sql = "SELECT * FROM news WHERE id = :id";
            $statment = $this->db->prepare($sql);
            $statment->bindValue(':id', $id, PDO::PARAM_INT);
            $statment->execute();
            $news = $statment->fetch(PDO::FETCH_ASSOC);
            if ($news) {
                return new News($news['id'], $news['name'], $news['description'], $news['imageSrc']);
            }
            return null;
        } catch (Exception $e) {
            return "Erro ao buscar a noticia: " . $e->getMessage();
        }
    }

    public function getNews($limit = 25)
    {
        try {
            $sql = "SELECT * FROM news ORDER BY id DESC LIMIT $limit";
            $statment = $this->db->query($sql);
            $newsFetched = $statment->fetchAll(PDO::FETCH_ASSOC);

            $news = [];
            foreach ($newsFetched as $new) {
                array_push($news, new News($new['id'], $new['name'], $new['description'], $new['imageSrc']));
            }

            return $news;
        } catch (Exception $e) {
            throw new Exception("Erro ao buscar os sorvetes: " . $e->getMessage());
        }
    }

    public function create($name, $description, $imageSrc)
    {
        $sql = "SELECT COUNT(*) FROM news WHERE name = :name";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':name', $name);
        $stmt->execute();

        if ($stmt->fetchColumn() > 0) {
            throw new Exception("Nome já cadastrado");
        }
        $sql = "INSERT INTO news (name, description, imageSrc) VALUES (:name, :description, :imageSrc)";
        $statment = $this->db->prepare($sql);
        $statment->bindValue(':name', $name);
        $statment->bindValue(':description', $description);
        $statment->bindValue(':imageSrc', $imageSrc);
        if (!$statment->execute()) {
            $errorInfo = $statment->errorInfo();
            throw new Exception("Erro ao inserir noticia: " . $errorInfo[2]);
        }
    }

    public function update($id, $name, $description, $imageSrc)
    {
        try {
            $sql = "UPDATE news SET name = :name, description = :description, imageSrc = :imageSrc WHERE id = :id";
            $statment = $this->db->prepare($sql);
            $statment->bindValue(':name', $name);
            $statment->bindValue(':description', $description);
            $statment->bindValue(':imageSrc', $imageSrc);
            $statment->bindValue(':id', $id, PDO::PARAM_INT);
            $statment->execute();

            if ($statment->rowCount() > 0) {
                return 'Noticia atualizada com sucesso.';
            } else {
                return 'Noticia não encontrado.';
            }
        } catch (Exception $e) {
            return "Erro ao atualizar a noticia: " . $e->getMessage();
        }
    }

    public function delete(int $id)
    {
        try {
            $sql = "DELETE FROM news WHERE id = :id";
            $statment = $this->db->prepare($sql);
            $statment->bindValue(':id', $id, PDO::PARAM_INT);
            $statment->execute();
            if ($statment->rowCount() > 0) {
                return 'Notícia deletado com sucesso.';
            } else {
                return 'Notícia não encontrado.';
            }
        } catch (Exception $e) {
            return "Erro ao deletar Notícia: " . $e->getMessage();
        }
    }
}
