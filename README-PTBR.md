<div align="center">
  <img src="public/assets/logo.png" alt="Fabrica de Delicias Logo" width="200" style="margin-bottom: 30px;">

# Fábrica de Delícias

[English](README.md) | **Português**

  <p>Aplicação web em PHP/MySQL para gerenciamento de sorveteria com painel administrativo completo</p>
    <div style="margin-bottom: 10px">
    <img src="https://img.shields.io/badge/Language-PHP-777BB4?logo=php&logoColor=white" alt="Language: PHP"/>
    <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" alt="Database: MySQL"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white" alt="CSS3"/>
    </div>
    <br>
</div>

# Links Rápidos

- [Descrição](#descrição)
- [Stack](#stack)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Banco de dados](#banco-de-dados)
- [Licença](#licença)

## Descrição

Este projeto é a versão original da **Fábrica de Delícias**, construída em PHP com arquitetura MVC e banco de dados MySQL. A aplicação possui área pública para visualização de produtos e notícias, além de um painel administrativo completo para gerenciar produtos, notícias e usuários.

O roteamento é server-side via `core/router.php`, com URLs amigáveis configuradas por `.htaccess`.

## Stack

- PHP (MVC com controllers, DAOs, models e views)
- MySQL + PDO
- HTML5 + CSS3
- JavaScript para interações pontuais
- Font Awesome

## Funcionalidades

### Área Pública

- **Home**: Página inicial com destaques e lançamentos recentes
- **Produtos**: Catálogo de sorvetes
- **Notícias**: Notícias e novidades
- **Sobre**: Informações sobre a empresa

### Painel Administrativo

- **Autenticação**: Sistema de login com validação
- **Gestão de Produtos**: CRUD completo (Criar, Ler, Atualizar, Deletar) de sorvetes
- **Gestão de Notícias**: CRUD completo de notícias e artigos
- **Gestão de Usuários**: CRUD completo de usuários administrativos
- **Upload de Imagens**: Imagens salvas em `public/uploads/`
- **Modal de Confirmação**: Confirmação para operações de exclusão

## Estrutura do Projeto

```
icecream-shop/
├── app/
│   ├── controllers/        # Controllers (publico e admin)
│   ├── dao/                # DAOs para acesso ao banco
│   ├── model/              # Models e conexao com DB
│   └── views/              # Views (publico e admin)
├── core/
│   ├── helper.php          # Helpers (base_url)
│   └── router.php          # Roteador
├── public/
│   ├── assets/             # Assets (logos, imagens)
│   ├── fontawesome/        # Font Awesome
│   ├── style/              # CSS
│   ├── uploads/            # Uploads de imagens
│   ├── db.sql              # Schema e seed
│   └── index.php           # Front controller
├── .htaccess               # Rewrite para /public
├── README-PTBR.md          # Documentação em Português
└── README.md               # Documentação em Inglês
```

## Como executar

1. **Requisitos**: PHP 7.4+ com PDO, MySQL e servidor Apache/Nginx com `mod_rewrite`.
2. **Banco**: crie o banco `icecream_shop_db` e importe `public/db.sql`.
3. **Credenciais**: ajuste o acesso em `app/model/database.php`.
4. **URLs**: atualize `core/helper.php` (função `base_url`) e `public/.htaccess` (RewriteBase) caso o projeto não esteja em `/a4-app-internet/`.
5. **Acesso**: abra `http://localhost/icecream-shop/` no navegador (ajuste conforme sua URL local).

Para o painel administrativo, acesse `/admin/login`. O arquivo `public/db.sql` possui dados de exemplo para testes.

## Banco de dados

O arquivo `public/db.sql` contém o schema e dados iniciais. As tabelas principais são:

- `icecream`
- `news`
- `users`

## Licença

Este projeto está licenciado sob a Licença [MIT](LICENSE.txt).
