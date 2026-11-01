-- ESSENZA · Estructura de la base de datos (MySQL)
-- Uso: mysql -u root -p < src/database/structure.sql     (o ejecutarlo desde MySQL Workbench / phpMyAdmin)

DROP DATABASE IF EXISTS essenza;
CREATE DATABASE essenza CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE essenza;

-- Categorías de usuario (admin, cliente)
CREATE TABLE user_categories (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(30)  NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_user_categories_name (name)
);

-- Usuarios
CREATE TABLE users (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name     VARCHAR(60)  NOT NULL,
  last_name      VARCHAR(60)  NOT NULL,
  email          VARCHAR(120) NOT NULL,
  password       VARCHAR(100) NOT NULL,                       -- hash bcrypt
  image          VARCHAR(255) NOT NULL DEFAULT '',            -- imagen de perfil
  remember_token VARCHAR(64)  NULL,                           -- cookie "recordarme" (hash)
  category_id    INT UNSIGNED NOT NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  CONSTRAINT fk_users_category FOREIGN KEY (category_id) REFERENCES user_categories (id)
);

-- Categorías de producto (hombre, mujer)
CREATE TABLE categories (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(40)  NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name)
);

-- Productos
CREATE TABLE products (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  description TEXT         NOT NULL,
  image       VARCHAR(255) NOT NULL DEFAULT '/img/default.jpg',
  price       INT UNSIGNED NOT NULL DEFAULT 0,                -- pesos colombianos (COP)
  category_id INT UNSIGNED NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_name (name),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Colores
CREATE TABLE colors (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(40)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_colors_name (name)
);

-- Relación muchos a muchos: productos <-> colores
CREATE TABLE product_colors (
  product_id INT UNSIGNED NOT NULL,
  color_id   INT UNSIGNED NOT NULL,
  PRIMARY KEY (product_id, color_id),
  CONSTRAINT fk_pc_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  CONSTRAINT fk_pc_color   FOREIGN KEY (color_id)   REFERENCES colors (id)   ON DELETE CASCADE
);

-- Carritos de compra (opcional)
CREATE TABLE carts (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    INT UNSIGNED NOT NULL,
  total      INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Productos de cada carrito (opcional)
CREATE TABLE cart_items (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  cart_id    INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity   INT UNSIGNED NOT NULL DEFAULT 1,
  price      INT UNSIGNED NOT NULL,                           -- precio unitario al momento de la compra
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_ci_cart    FOREIGN KEY (cart_id)    REFERENCES carts (id)    ON DELETE CASCADE,
  CONSTRAINT fk_ci_product FOREIGN KEY (product_id) REFERENCES products (id)
);
