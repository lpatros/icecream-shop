<div align="center">
  <img src="public/assets/logo.png" alt="Fabrica de Delicias Logo" width="200" style="margin-bottom: 30px;">

# Fábrica de Delícias

[English](README.md) | **Português**

  <p>Uma aplicação web para gerenciamento de sorveteria com painel administrativo completo</p>
    <div style="margin-bottom: 10px">
    <img src="https://img.shields.io/badge/Language-JavaScript-yellow.svg" alt="Language: JavaScript"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white" alt="CSS3"/>
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT"/>
    </div>
    <br>
</div>

# Links Rápidos

- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Deploy](#deploy)
- [Licença](#licença)

## Descrição

Este projeto é uma aplicação web SPA (Single Page Application) desenvolvida como uma versão demonstrativa da **[Fábrica de Delícias](https://github.com/lpatros/icecream-shop/tree/php)** para o gerenciamento de uma sorveteria. O projeto implementa um sistema completo com área pública para visualização de produtos e notícias, além de um painel administrativo robusto para gerenciamento de produtos, notícias e usuários.

Essa versão demonstrativa utiliza JavaScript, roteamento client-side baseado em hash, e LocalStorage para persistência de dados.

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
- **Modal de Confirmação**: Sistema de confirmação para operações de exclusão

## Estrutura do Projeto

```
demo-icecream-shop/
├── css/                    # Estilos CSS
│
├── database/               # Dados mock
│
├── images/                 # Imagens do site
│
├── pages/                  # Páginas da aplicação
│
├── public/                 # Arquivos públicos
│   ├── assets/             # Assets (logos, imagens)
│   └── fontawesome/        # Biblioteca Font Awesome
│
├── util/                   # Utilitários e helpers
│
├── index.html              # Ponto de entrada da aplicação
├── router.js               # Sistema de roteamento SPA
├── README-PTBR.md          # Documentação em Português
└── README.md               # Documentação em Inglês
```

## Deploy

O projeto está disponivel para acesso [aqui](https://fabricadedelicias.vercel.app).

## Licença

Este projeto está licenciado sob a Licença [MIT](LICENSE.txt).
