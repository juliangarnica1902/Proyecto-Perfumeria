# ESSENZA – Tienda de perfumes (Sprint 4)

Aplicación web de una perfumería desarrollada con **Node.js, Express y EJS**. En este sprint el sitio deja de usar datos fijos y pasa a trabajar con **productos y usuarios reales almacenados en archivos JSON**, con administración completa de productos (CRUD), registro e inicio de sesión, carrito de compras y pedido por **WhatsApp**.

## Tablero de trabajo

https://trello.com/invite/b/6ace4f24f7d96393d3506ccb/ATTI776c7620b21701a81efbff9e24c9aada8B2F3ED7/proyecto-perfumeria-essenza


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

## Novedades del Sprint 4

- Productos y usuarios guardados en JSON (`src/data/products.json` y `src/data/users.json`).
- **CRUD completo de productos:** listado, detalle, creación, edición y eliminación.
- Subida de la imagen del producto desde el formulario, con vista previa.
- Registro e inicio de sesión de usuarios, con contraseñas cifradas.
- Carrito de compras guardado en la sesión.
- Pedido por WhatsApp con el resumen de la compra.

## Estructura de datos

### Producto (`products.json`)

| Campo | Descripción |
|---|---|
| `id` | Identificador único (se asigna solo) |
| `name` | Nombre del producto |
| `description` | Descripción y notas olfativas |
| `image` | Ruta de la imagen (por ejemplo `/img/1730000000000.jpg`) |
| `category` | `hombre` o `mujer` |
| `colors` | Lista de colores o tamaños |
| `price` | Precio en pesos colombianos (COP) |

### Usuario (`users.json`)

| Campo | Descripción |
|---|---|
| `id` | Identificador único |
| `firstName` | Nombre |
| `lastName` | Apellido |
| `email` | Correo electrónico (único) |
| `password` | Contraseña cifrada con bcrypt |
| `category` | `admin` o `cliente` |

## Rutas del CRUD de productos

| Método | Ruta | Acción |
|---|---|---|
| GET | `/products` | Listado de productos (admite `?category=hombre` o `?category=mujer`) |
| GET | `/products/create` | Formulario de creación |
| GET | `/products/:id` | Detalle de un producto |
| POST | `/products` | Crear un producto |
| GET | `/products/:id/edit` | Formulario de edición |
| PUT | `/products/:id` | Actualizar un producto |
| DELETE | `/products/:id` | Eliminar un producto |

Los formularios HTML solo envían `GET` y `POST`, por eso `PUT` y `DELETE` se envían con el paquete **method-override** (`?_method=PUT` y `?_method=DELETE`).

## Otras rutas

| Método | Ruta | Acción |
|---|---|---|
| GET / POST | `/users/register` | Formulario y alta de usuario |
| GET / POST | `/users/login` | Formulario e inicio de sesión |
| GET | `/users/logout` | Cierre de sesión |
| GET | `/cart` | Ver el carrito |
| POST | `/cart/add/:id` | Añadir un producto al carrito |
| POST | `/cart/update/:id` | Cambiar la cantidad |
| POST | `/cart/remove/:id` | Quitar un producto |

## Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express 4 | Servidor y rutas |
| EJS | Plantillas de las vistas |
| method-override | Permite `PUT` y `DELETE` desde formularios |
| multer | Subida de imágenes de los productos |
| express-session | Sesiones de usuario y carrito |
| bcryptjs | Cifrado de contraseñas |
| HTML + CSS | Interfaz (tema oscuro y dorado) |

## Estructura del proyecto

```
Proyecto-Perfumeria/
├── app.js                    # Configuración del servidor
├── package.json
├── scripts/
│   └── seedUsers.js          # Genera users.json con contraseñas cifradas
├── public/
│   ├── css/styles.css        # Estilos
│   └── img/                  # Imágenes de los productos
└── src/
    ├── controllers/          # cartController, mainController, productsController, usersController
    ├── data/                 # products.json y users.json
    ├── models/               # productModel y userModel (leen y escriben el JSON)
    ├── routes/               # cart, main, products y users
    └── views/
        ├── partials/         # head, header, footer, bottle, product-card, product-form
        ├── products/         # list, detail, create y edit
        ├── users/            # login y register
        ├── cart.ejs
        └── index.ejs
```

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

## Instalación y uso

1. Clona el repositorio y cambia a la rama del sprint:
   ```bash
   git clone https://github.com/juliangarnica1902/Proyecto-Perfumeria.git
   cd Proyecto-Perfumeria
   git checkout sprint4
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. (Opcional) Genera los usuarios de ejemplo:
   ```bash
   node scripts/seedUsers.js
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. Abre <http://localhost:3000> en el navegador.

### Usuarios de ejemplo

| Correo | Contraseña | Categoría |
|---|---|---|
| admin@essenza.com | admin123 | admin |
| laura@correo.com | cliente123 | cliente |
| carlos@correo.com | cliente123 | cliente |

También se puede crear una cuenta nueva desde `/users/register`.

## Entregables del Sprint 4

- `retro.md` con el resultado de la retrospectiva del Sprint 3.
- `daily.md` (opcional) con las opiniones sobre las dailies/weeklies.
- Tablero de trabajo actualizado (enlace al inicio de este documento).
- Archivos `products.json` y `users.json` con datos de productos y usuarios.
- Administración completa de productos: listado, detalle, creación, edición y eliminación.

## Limitaciones

- Los datos se guardan en archivos JSON, suficiente para este sprint. En los siguientes se migrará a una base de datos.
- Las rutas de crear, editar y eliminar productos aún no están protegidas: cualquier visitante puede usarlas. La protección por rol (administrador) corresponde a un sprint posterior.
- El carrito se guarda en la sesión y se pierde al reiniciar el servidor.
- El pago no se procesa en línea: la compra se coordina por WhatsApp.
- Cambia el valor de `SECRET` (variable de entorno) antes de publicar la aplicación.



## Autor

Ronaldo Becerra Gonzalez Diego Andrey Carreño Chaparro Julian Rene Fernandez Garnica