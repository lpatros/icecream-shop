<div align="center">
  <img src="public/assets/logo.png" alt="Fabrica de Delicias Logo" width="200" style="margin-bottom: 30px;">

# Fábrica de Delícias

**English** | [Português](README-PTBR.md)

  <p>PHP/MySQL web app for managing an ice cream shop with a full admin dashboard</p>
    <div style="margin-bottom: 10px">
    <img src="https://img.shields.io/badge/Language-PHP-777BB4?logo=php&logoColor=white" alt="Language: PHP"/>
    <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" alt="Database: MySQL"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3"/>
    </div>
    <br>
</div>

# Quick Links

- [Description](#description)
- [Stack](#stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Database](#database)
- [License](#license)

## Description

This project is the original version of **Fábrica de Delícias**, built in PHP with an MVC architecture and a MySQL database. The application includes a public area for browsing products and news, plus a complete admin panel to manage products, news, and users.

Routing is server-side via `core/router.php`, with friendly URLs configured by `.htaccess`.

## Stack

- PHP (MVC with controllers, DAOs, models, and views)
- MySQL + PDO
- HTML5 + CSS3
- JavaScript for light interactions
- Font Awesome

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
- **Image Uploads**: Images stored in `public/uploads/`
- **Confirmation Modal**: Delete confirmation for destructive actions

## Project Structure

```
icecream-shop/
├── app/
│   ├── controllers/        # Controllers (public and admin)
│   ├── dao/                # DAOs for DB access
│   ├── model/              # Models and DB connection
│   └── views/              # Views (public and admin)
├── core/
│   ├── helper.php          # Helpers (base_url)
│   └── router.php          # Router
├── public/
│   ├── assets/             # Assets (logos, images)
│   ├── fontawesome/        # Font Awesome
│   ├── style/              # CSS
│   ├── uploads/            # Image uploads
│   ├── db.sql              # Schema and seed
│   └── index.php           # Front controller
├── .htaccess               # Rewrite to /public
├── README-PTBR.md          # Documentation in Portuguese
└── README.md               # Documentation in English
```

## How to Run

1. **Requirements**: PHP 7.4+ with PDO, MySQL, and Apache/Nginx with `mod_rewrite`.
2. **Database**: create the `icecream_shop_db` database and import `public/db.sql`.
3. **Credentials**: update access settings in `app/model/database.php`.
4. **URLs**: update `core/helper.php` (the `base_url` function) and `public/.htaccess` (RewriteBase) if the project is not in `/a4-app-internet/`.
5. **Access**: open `http://localhost/icecream-shop/` in your browser (adjust to your local URL).

For the admin panel, go to `/admin/login`. The `public/db.sql` file includes sample data for testing.

## Database

The `public/db.sql` file contains the schema and initial data. Main tables:

- `icecream`
- `news`
- `users`

## License

This project is licensed under the [MIT License](LICENSE.txt).
