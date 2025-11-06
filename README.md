# Projeto A4 - Aplicações Na Internet

Este é um projeto desenvolvido para a disciplina de Aplicações para Internet, focado em criar uma aplicação web para uma sorveteria.

## Estrutura do Projeto

O projeto segue uma estrutura MVC (Model-View-Controller) e está organizado da seguinte forma:

```
a4-app-internet/
├── app/                    # Contém a lógica da aplicação
│   ├── controllers/        # Controladores (lógica de negócio)
│   ├── dao/                # Data Access Objects (interação com o banco de dados)
│   ├── model/              # Modelos (representação dos dados e regras de negócio)
│   └── views/              # Arquivos de visualização (HTML com PHP)
├── core/                   # Núcleo do sistema
│   ├── helper.php          # Funções auxiliares
│   └── router.php          # Gerenciador de rotas
├── public/                 # Arquivos públicos (acessíveis pelo navegador)
│   ├── assets/             # Imagens e outros recursos estáticos
│   ├── fontawesome/        # Biblioteca de ícones Font Awesome
│   ├── style/              # Arquivos CSS (estilos)
│   ├── index.php           # Ponto de entrada da aplicação
│   └── db.sql              # Script SQL para criação do banco de dados
├── .htaccess               # Configurações do Apache para reescrita de URL (nível raiz)
└── README.md               # Este arquivo
```

## Como Executar o Projeto

1.  **Pré-requisitos:**
    *   Servidor web local com suporte a PHP (XAMPP, WAMP, MAMP, etc.).
    *   Banco de dados MySQL.

2.  **Configuração:**
    *   Clone ou baixe este repositório para a pasta `htdocs` (ou equivalente) do seu servidor web (ex: `c:\xampp\htdocs\a4-app-internet`).
    *   Importe o arquivo `public/db.sql` para o seu banco de dados MySQL. Crie um banco de dados chamado `icecream_shop_db` (ou o nome que preferir, mas ajuste as configurações de conexão no código se necessário, tipicamente em `app/model/database.php`).

3.  **Acesso:**
    *   Inicie o seu servidor Apache e o MySQL.
    *   Abra o navegador e acesse `http://localhost/a4-app-internet/`.

## Tecnologias Utilizadas

*   **Backend:** PHP
*   **Frontend:** HTML, CSS, JavaScript
*   **Banco de Dados:** MySQL
*   **Servidor Web:** Apache (via XAMPP)

## Funcionalidades Principais

*   Visualização de produtos (sorvetes).
*   Visualização de notícias.
*   Área administrativa para gerenciamento de:
    *   Produtos
    *   Notícias
    *   Usuários
*   Sistema de login para acesso à área administrativa.
*   Roteamento de URLs.

## Observações

*   O arquivo `.htaccess` na raiz do projeto (`a4-app-internet/.htaccess`) redireciona todas as requisições para a pasta `public/`.
*   O arquivo `.htaccess` dentro da pasta `public/` (`a4-app-internet/public/.htaccess`) trata as URLs, direcionando-as para o `index.php` com o parâmetro `url`.
*   A função `base_url()` em `core/helper.php` é utilizada para gerar URLs absolutas dentro do projeto.
