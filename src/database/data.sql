USE essenza;

INSERT INTO user_categories (id, name) VALUES (1, 'admin'), (2, 'cliente');

INSERT INTO categories (id, name) VALUES (1, 'hombre'), (2, 'mujer');
INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `remember_token`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Essenza', 'admin@essenza.com', '$2b$10$exj/d0Hyh0I9w0NqIwsvNuZjvHmgeqDpLfTu68sV5P1H2HnXNyz3S', '', NULL, 1, '2026-11-01 14:48:21', '2026-11-01 14:48:21'),
(2, 'Laura', 'Gómez', 'laura@correo.com', '$2b$10$mrjXRLtkjYtTfOZm/7sIj.RsjWI6Z8TTYz3HYIePeM6gBUXBxITC6', '', NULL, 2, '2026-11-01 14:48:21', '2026-11-01 14:48:21'),
(3, 'Carlos', 'Pérez', 'carlos@correo.com', '$2b$10$..KnCnNLtL1/nlFPEmVbt.hjy16TYlkwoX8.9XGwEH33iRM/5p2b2', '', NULL, 2, '2026-11-01 14:48:21', '2026-11-01 14:48:21');
INSERT INTO colors (id, name) VALUES
 (1,'Negro'),(2,'Dorado'),(3,'Rosa'),(4,'Amarillo'),(5,'Transparente'),(6,'Verde'),
 (7,'Crema'),(8,'Azul'),(9,'Plateado'),(10,'Marrón'),(11,'Violeta'),(12,'Blanco');

INSERT INTO products (id, name, description, image, price, category_id) VALUES
 (1,'Noir Ámbar','Ámbar, vainilla y madera de oud','/img/noir-ambar.svg',289000,1),
 (2,'Rosa Dorada','Rosa de Damasco, peonía y almizcle','/img/rosa-dorada.svg',245000,2),
 (3,'Cítrico Sol','Bergamota, mandarina y vetiver','/img/citrico-sol.svg',198000,1),
 (4,'Bosque Místico','Pino, musgo y cedro','/img/bosque-mistico.jpg',265000,1),
 (5,'Vainilla Real','Vainilla de Madagascar y haba tonka','/img/vainilla-real.jpg',225000,2),
 (6,'Océano Azul','Sal marina, lavanda y salvia','/img/oceano-azul.jpg',210000,1),
 (7,'Jazmín Nocturno','Jazmín, ylang-ylang y sándalo','/img/jazmin-nocturno.jpg',258000,2),
 (8,'Cuero Imperial','Cuero, tabaco y pimienta negra','/img/cuero-imperial.jpg',299000,1),
 (9,'Lavanda Real','Lavanda, salvia y musgo blanco','/img/lavanda-real.jpg',189000,2),
 (10,'Flor de Naranjo','Azahar, neroli y almizcle blanco','/img/flor-de-naranjo.jpg',232000,2);

INSERT INTO product_colors (product_id, color_id) VALUES
 (1,1),(1,2),(2,3),(2,2),(3,4),(3,5),(4,6),(4,1),(5,7),(5,2),
 (6,8),(6,5),(7,1),(7,9),(8,10),(8,2),(9,11),(9,9),(10,12),(10,2);

