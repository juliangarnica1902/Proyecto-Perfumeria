# ESSENZA – Tienda de perfumes (Sprint 6)

Aplicación web de una perfumería desarrollada con **Node.js, Express y EJS**. En este sprint los datos dejan de vivir en archivos JSON y pasan a una **base de datos MySQL**, manejada desde Node con el ORM **Sequelize**.



## Temática del sitio

ESSENZA es una perfumería en línea de fragancias de autor. El sitio transmite elegancia y exclusividad con una estética oscura y dorada, y presenta cada perfume con su descripción para que el cliente elija con información clara. La compra es sencilla: se arma el carrito y el pedido se cierra con atención personalizada por WhatsApp.

## Público objetivo

- Adultos de 18 a 45 años que compran perfumes para uso personal o como regalo.
- Personas que prefieren comprar desde el celular y resolver dudas de forma directa por WhatsApp.
- Clientes que buscan fragancias cuidadas y diferentes a las de las grandes marcas comerciales.
- Compradores de fechas especiales (cumpleaños, aniversarios, Día de la Madre, Navidad).

## Referentes

| Referente | Sitio | Qué se tomó como referencia |
|---|---|---|
| Sephora | https://www.sephora.com | Catálogo por categorías y tarjetas de producto claras |
| Notino | https://www.notino.es | Precios visibles y proceso de compra directo |
| Douglas | https://www.douglas.es | Organización del catálogo y presentación de fragancias |
| Jo Malone London | https://www.jomalone.com | Imagen elegante y descripción de las fragancias |
| Le Labo | https://www.lelabofragrances.com | Estilo minimalista y marca de perfumería de autor |
| Byredo | https://www.byredo.com | Diseño sobrio y enfoque en la identidad de marca |

## Novedades del Sprint 6

- **Diagrama entidad-relación** de la base de datos en `docs/DER_essenza.pdf`.
- **`structure.sql`**: crea la base de datos `essenza` y todas sus tablas, con tipos de datos, restricciones y claves foráneas.
- **`data.sql`**: llena la base con perfumes, colores, categorías y usuarios de ejemplo.
- **Carpeta `src/database`** con la configuración de Sequelize y los modelos con sus relaciones.
- **CRUD de productos con Sequelize**: listar, ver detalle, crear, editar, eliminar y **buscar** por nombre o descripción.
- **CRUD de usuarios con Sequelize**: registro (crear), perfil (detalle) y edición del perfil, además del login con "recordarme".
- El carrito y el home leen los productos desde la base de datos.

## Base de datos

Motor: **MySQL** (se puede usar con XAMPP). ORM: **Sequelize**.

| Tabla | Descripción |
|---|---|
| `user_categories` | Categorías de usuario (`admin`, `cliente`) |
| `users` | Usuarios, con contraseña cifrada (bcrypt) |
| `categories` | Categorías de producto (`hombre`, `mujer`) |
| `products` | Perfumes |
| `colors` | Colores disponibles |
| `product_colors` | Tabla intermedia: un producto tiene varios colores y un color está en varios productos |
| `carts` | Carritos de compra (opcional) |
| `cart_items` | Productos de cada carrito (opcional) |

### Relaciones

- `user_categories` 1 → N `users`
- `categories` 1 → N `products`
- `products` N ↔ N `colors` (a través de `product_colors`)
- `users` 1 → N `carts`
- `carts` 1 → N `cart_items`
- `products` 1 → N `cart_items`

### Diagrama entidad-relación

![Diagrama entidad-relación de ESSENZA](docs/DER_essenza.png)

También está disponible en PDF: [`docs/DER_essenza.pdf`](docs/DER_essenza.pdf).

## Rutas

### Productos

| Método | Ruta | Acción |
|---|---|---|
| GET | `/products` | Listado. Admite `?q=texto` (buscador) y `?category=hombre` o `?category=mujer` |
| GET | `/products/:id` | Detalle |
| GET | `/products/create` | Formulario de creación (con sesión) |
| POST | `/products` | Crear (con sesión) |
| GET | `/products/:id/edit` | Formulario de edición (con sesión) |
| PUT | `/products/:id` | Editar (con sesión) |
| DELETE | `/products/:id` | Eliminar (con sesión) |

### Usuarios

| Método | Ruta | Acción | Acceso |
|---|---|---|---|
| GET / POST | `/users/register` | Registro con imagen de perfil | Solo huéspedes |
| GET / POST | `/users/login` | Inicio de sesión (con "recordarme") | Solo huéspedes |
| GET | `/users/profile` | Detalle del perfil | Con sesión |
| GET | `/users/profile/edit` | Formulario de edición | Con sesión |
| PUT | `/users/profile` | Editar datos, imagen o contraseña | Con sesión |
| GET | `/users/logout` | Cerrar sesión | Con sesión |

### Otras

`/` (home), `/cart` (carrito) y `/ayuda`.

## Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express 4 | Servidor y rutas |
| EJS | Plantillas de las vistas |
| MySQL | Base de datos |
| Sequelize | ORM: modelos, relaciones y consultas |
| mysql2 | Controlador de MySQL para Node |
| sequelize-cli | Herramienta de línea de comandos (se instala de forma global) |
| express-session y cookie-parser | Sesiones y cookie de "recordarme" |
| bcryptjs | Cifrado de contraseñas |
| multer | Subida de imágenes |
| method-override | `PUT` y `DELETE` desde formularios |

## Estructura del proyecto

```
Proyecto-Perfumeria/
├── app.js
├── package.json
├── .sequelizerc              # Indica a sequelize-cli dónde está la carpeta database
├── docs/
│   └── DER_essenza.pdf       # Diagrama entidad-relación
├── scripts/
│   └── seedUsers.js          # Crea usuarios de ejemplo (opcional)
├── public/                   # CSS, imágenes de productos y de perfil
└── src/
    ├── database/
    │   ├── config/config.js  # Conexión a MySQL
    │   ├── models/           # Modelos de Sequelize y sus relaciones
    │   ├── structure.sql     # Crea la base de datos y las tablas
    │   └── data.sql          # Datos de ejemplo
    ├── controllers/          # cart, main, products y users
    ├── helpers/              # productView.js
    ├── middlewares/          # guest, auth y remember
    ├── routes/               # cart, help, main, products y users
    └── views/                # partials, products, users, cart, help e index
```

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- MySQL (por ejemplo [XAMPP](https://www.apachefriends.org/)) encendido en el puerto 3306

## Instalación y uso

1. Clona el repositorio y cambia a la rama del sprint:
   ```bash
   git clone https://github.com/juliangarnica1902/Proyecto-Perfumeria.git
   cd Proyecto-Perfumeria
   git checkout sprint6
   ```
2. Instala las dependencias:
   ```bash
   npm install
   npm install -g sequelize-cli
   ```
3. Enciende MySQL (en XAMPP, botón **Start** en MySQL).
4. Crea la base de datos. En phpMyAdmin (http://localhost/phpmyadmin), sin seleccionar ninguna base, abre la pestaña **Importar** y ejecuta, en este orden:
   1. `src/database/structure.sql`
   2. `src/database/data.sql`
5. Inicia el servidor:
   ```bash
   npm start
   ```
6. Abre <http://localhost:3000> en el navegador.


### Usuarios de ejemplo

| Correo | Contraseña | Categoría |
|---|---|---|
| admin@essenza.com | admin123 | admin |
| laura@correo.com | cliente123 | cliente |
| carlos@correo.com | cliente123 | cliente |

También se puede crear una cuenta nueva desde `/users/register`.

## Entregables del Sprint 6

- `retro.md` con el resultado de la retrospectiva del Sprint 5.
- `daily.md` (opcional) con las opiniones sobre las dailies/weeklies.
- Tablero de trabajo actualizado (enlace al inicio de este documento).
- Diagrama de la base de datos: `docs/DER_essenza.pdf`.
- Script de estructura: `src/database/structure.sql`.
- Script de datos (opcional): `src/database/data.sql`.
- Carpeta `src/database` con la configuración de Sequelize y los modelos con sus relaciones.
- CRUD de productos y de usuarios con Sequelize.

## Limitaciones

- El carrito se guarda en la sesión, y no en las tablas `carts` y `cart_items`. Esas tablas existen en la base, pero todavía no las usa el sitio.
- Cualquier usuario con sesión puede crear, editar y eliminar productos. La restricción por rol (solo `admin`) queda para un sprint posterior.
- El pago no se procesa en línea: la compra y el formulario de contacto se coordinan por WhatsApp.
- Los archivos `products.json` y `users.json` de sprints anteriores ya no se usan.

## Próximos pasos

- Validaciones de formularios en el servidor (Sprint 7).
- Consumo de APIs y frontend con React (Sprint 8).
- Guardar los pedidos del carrito en las tablas `carts` y `cart_items`.
- Restringir la administración de productos al rol `admin`.

