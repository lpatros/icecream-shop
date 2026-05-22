CREATE TABLE icecream (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price FLOAT,
    imageSrc varchar(255)
);

create table news (
	id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    imageSrc varchar(255)
);

INSERT INTO icecream (name, description, price, imageSrc) VALUES 
("Sorvete de Chocolate", "Delicioso sorvete de chocolate cremoso", 8.99, "uploads/products/1.jpg"),
("Sorvete de Baunilha", "Clássico sorvete de baunilha artesanal", 7.99, "uploads/products/2.png"),
("Sorvete de Flocos", "Sorvete de creme com flocos crocantes de chocolate", 9.99, "uploads/products/3.jpeg"),
("Sorvete de Caramelo", "Sorvete doce com calda de caramelo salgado", 9.59, "uploads/products/4.jpg");

INSERT INTO news (name, description, imageSrc) VALUES
('Nova Fórmula do Sorvete', 'Lançamos uma fórmula ainda mais cremosa e saborosa, feita com ingredientes naturais.', 'uploads/news/3.webp'),
('Sabores da Temporada', 'Aproveite os novos sabores especiais lançados para esta estação, como Baunilia e Chocolate.', 'uploads/news/2.webp'),
('Sorvete Vegano Chegou!', 'Pensando em todos os nossos clientes, agora temos opções 100% veganas no nosso cardápio.', 'uploads/news/1.avif'),
('Loja Nova!', 'A família Fábrica de Delícias cresceu! Com o mesmo compromisso de entregar qualidade, frescor e um atendimento que faz você se sentir em casa, inauguramos nossa nova loja no centro. Prepare-se para se deliciar com nossos sabores únicos, incluindo opções veganas, todos produzidos com a paixão e o cuidado artesanal que você já conhece. Esperamos por você para compartilhar a alegria de cada colherada!', 'uploads/news/4.jpg');

CREATE TABLE users (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users (name, email, password) VALUES
("Gabriel", "gabrielnathan@gmail.com", "abcdefgh"),
("Leonardo", "leonardo@gmail.com", "87654321"),
("Itallo", "itallo@gmail.com", "12345678");