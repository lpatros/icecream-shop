[PT-BR](README-PTBR.md)

<div align="center">
  <img src="public/assets/logo.png" alt="Fabrica de Delicias Logo" width="200" style="margin-bottom: 30px;">
  <h1 style="font-size: 32px; border: none; line-height: 0; font-weight: bold">Fábrica de Delícias</h1>
  <p>A web application for ice cream shop management with a complete admin panel</p>
    <div style="margin-bottom: 10px">
    <img src="https://img.shields.io/badge/Language-JavaScript-yellow.svg" alt="Language: JavaScript"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white" alt="CSS3"/>
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT"/>
    </div>
    <br>
</div>

# Quick Links

- [Description](#description)
- [Features](#features)
- [Project Structure](#project-structure)
- [Deploy](#deploy)
- [License](#license)

## Description

This project is a SPA (Single Page Application) web app developed as a demo version of **[Fábrica de Delícias](https://github.com/lpatros/icecream-shop/tree/php)** for ice cream shop management. It implements a complete system with a public area for viewing products and news, plus a robust admin panel for managing products, news, and users.

This demo version uses JavaScript, client-side hash-based routing, and LocalStorage for data persistence.

## Features

### Public Area

- **Home**: Landing page with highlights and recent releases
- **Products**: Ice cream catalog
- **News**: News and updates
- **About**: Company information

### Admin Panel

- **Authentication**: Login system with validation
- **Product Management**: Full CRUD (Create, Read, Update, Delete) for ice creams
- **News Management**: Full CRUD for news and articles
- **User Management**: Full CRUD for admin users
- **Confirmation Modal**: Confirmation system for delete operations

## Project Structure

```
demo-icecream-shop/
├── css/                    # CSS styles
│
├── database/               # Mock data
│
├── images/                 # Site images
│
├── pages/                  # Application pages
│
├── public/                 # Public files
│   ├── assets/             # Assets (logos, images)
│   └── fontawesome/        # Font Awesome library
│
├── util/                   # Utilities and helpers
│
├── index.html              # Application entry point
├── router.js               # SPA routing system
├── README-PTBR.md          # Documentation in Portuguese
└── README.md               # Documentation in English
```

## Deploy

The project is available [here](https://fabricadedelicias.vercel.app).

## License

This project is licensed under the [MIT License](LICENSE.txt).
