# ESSENZA – Tienda de perfumes (Sprint 5)

Aplicación web de una perfumería desarrollada con **Node.js, Express y EJS**. En este sprint el foco son los **usuarios**: registro con imagen de perfil, inicio y cierre de sesión, opción de recordar al usuario, página de perfil y rutas separadas para huéspedes (visitantes sin login) y para usuarios con sesión iniciada.

## Tablero de trabajo

🔗 https://trello.com/invite/b/6ace4f24f7d96393d3506ccb/ATTI776c7620b21701a81efbff9e24c9aada8B2F3ED7/proyecto-perfumeria-essenza

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

## Novedades del Sprint 5

- **Registro de usuarios** con nombre, apellido, correo y contraseña, más **imagen de perfil** (subida con Multer). La contraseña se guarda **encriptada con bcrypt** en `src/data/users.json`.
- **Login** con correo y contraseña. Si los datos son correctos, lleva al perfil; si no, muestra el error en el mismo formulario.
- **Recordarme:** casilla en el login que guarda una cookie, y un middleware de aplicación que inicia sesión automáticamente al volver al sitio.
- **Cierre de sesión (logout)**, que también borra la cookie.
- **Página de perfil** con la foto, el nombre, el correo y la categoría del usuario.
- **Usuario visible en el menú:** nombre con foto y botón de cerrar sesión.
- **Rutas de huéspedes** (solo sin login): registro y login. Si ya hay sesión, redirigen al perfil.
- **Rutas de usuarios** (solo con login): perfil, logout y crear, editar y eliminar productos. Si no hay sesión, redirigen al login.
- **Página de ayuda** (`/ayuda`) con rastreo de pedido, métodos de pago, envíos y devoluciones, preguntas frecuentes y políticas. Los enlaces del pie de página y los bloques de confianza del home llevan ahí.
- **Formulario de contacto** que abre WhatsApp con el mensaje ya escrito.
- Mejoras visuales: banner del home con imagen, tarjetas de hombre y mujer con imagen, y ajuste de las fotos de los productos dentro de sus recuadros.

## Estructura de datos

### Usuario (`users.json`)

| Campo | Descripción |
|---|---|
| `id` | Identificador único |
| `firstName` | Nombre |
| `lastName` | Apellido |
| `email` | Correo electrónico (único) |
| `password` | Contraseña cifrada con bcrypt |
| `category` | `admin` o `cliente` |
| `image` | Ruta de la imagen de perfil (por ejemplo `/images/users/1730000000000.jpg`) |
| `rememberToken` | Versión cifrada del código de la cookie "recordarme" (vacío si no se usa) |

### Producto (`products.json`)

| Campo | Descripción |
|---|---|
| `id` | Identificador único |
| `name` | Nombre del producto |
| `description` | Descripción y notas olfativas |
| `image` | Ruta de la imagen |
| `category` | `hombre` o `mujer` |
| `colors` | Lista de colores o tamaños |
| `price` | Precio en pesos colombianos (COP) |

## Rutas

### Huéspedes (solo sin sesión)

| Método | Ruta | Acción |
|---|---|---|
| GET / POST | `/users/register` | Formulario y alta de usuario con imagen de perfil |
| GET / POST | `/users/login` | Formulario e inicio de sesión (con "recordarme") |

### Usuarios (solo con sesión)

| Método | Ruta | Acción |
|---|---|---|
| GET | `/users/profile` | Perfil del usuario |
| GET | `/users/logout` | Cierre de sesión |
| GET | `/products/create` | Formulario de creación de producto |
| POST | `/products` | Crear producto |
| GET | `/products/:id/edit` | Formulario de edición |
| PUT | `/products/:id` | Actualizar producto |
| DELETE | `/products/:id` | Eliminar producto |

### Públicas (cualquiera)

| Método | Ruta | Acción |
|---|---|---|
| GET | `/` | Home |
| GET | `/products` | Listado (admite `?category=hombre` o `?category=mujer`) |
| GET | `/products/:id` | Detalle de un producto |
| GET | `/cart` | Carrito |
| POST | `/cart/add/:id`, `/cart/update/:id`, `/cart/remove/:id` | Añadir, cambiar cantidad o quitar |
| GET | `/ayuda` | Ayuda y políticas |

Los middlewares están en `src/middlewares/`:

- `guestMiddleware.js`: deja pasar solo a quien no tiene sesión.
- `authMiddleware.js`: deja pasar solo a quien tiene sesión.
- `rememberMiddleware.js`: si existe la cookie válida, inicia sesión automáticamente.

## Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express 4 | Servidor y rutas |
| EJS | Plantillas de las vistas |
| express-session | Sesiones de usuario y carrito |
| cookie-parser | Lectura de la cookie "recordarme" |
| bcryptjs | Cifrado de contraseñas |
| multer | Subida de imágenes de perfil y de productos |
| method-override | Permite `PUT` y `DELETE` desde formularios |
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
│   ├── img/                  # Imágenes de productos y del banner
│   └── images/users/         # Imágenes de perfil
└── src/
    ├── controllers/          # cart, main, products y users
    ├── data/                 # products.json y users.json
    ├── middlewares/          # guest, auth y remember
    ├── models/               # productModel y userModel
    ├── routes/               # cart, help, main, products y users
    └── views/
        ├── partials/         # head, header, footer, bottle, product-card, product-form
        ├── products/         # list, detail, create y edit
        ├── users/            # login, register y profile
        ├── cart.ejs
        ├── help.ejs
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
   git checkout sprint5
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

## Cómo probar el sprint

1. Sin sesión, abre `/users/profile`: debe redirigir al login.
2. Regístrate con una imagen de perfil: te lleva al login.
3. Inicia sesión: te lleva al perfil, y tu nombre aparece en el menú.
4. Con sesión, abre `/users/login` o `/users/register`: te redirige al perfil.
5. Marca **Recordarme**, cierra el navegador y vuelve a abrir el sitio: sigues con la sesión iniciada.
6. Cierra sesión y abre `/products/create`: te manda al login.

## Entregables del Sprint 5

- `retro.md` con el resultado de la retrospectiva del Sprint 4.
- `daily.md` (opcional) con las opiniones sobre las dailies/weeklies.
- Tablero de trabajo actualizado (enlace al inicio de este documento).
- Formulario de registro con los campos mínimos, imagen de perfil y guardado en JSON con contraseña encriptada.
- Formulario de login con correo y contraseña, y función de recordar al usuario.
- Rutas de huéspedes y de usuarios con sus redirecciones.

## Limitaciones

- Los datos se guardan en archivos JSON. En el siguiente sprint se migrará a una base de datos.
- El carrito se guarda en la sesión y se pierde al reiniciar el servidor.
- El pago no se procesa en línea: la compra y el formulario de contacto se coordinan por WhatsApp.
- Cualquier usuario con sesión puede crear, editar y eliminar productos. Una restricción por rol (solo `admin`) queda para un sprint posterior.
- Cambia el valor de `SECRET` (variable de entorno) antes de publicar la aplicación.

## Próximos pasos

- Base de datos relacional (Sprint 6).
- Validaciones de formularios en el servidor (Sprint 7).


