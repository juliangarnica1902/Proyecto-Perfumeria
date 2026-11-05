# ESSENZA – Tienda de perfumes (Sprint 7)

Aplicación web de una perfumería desarrollada con **Node.js, Express y EJS**, con base de datos **MySQL** manejada con **Sequelize**. En este sprint el foco son las **validaciones**: los formularios se validan primero en el **back-end** (con Express Validator) y también en el **front-end** (con JavaScript), para que no lleguen datos inválidos a la base de datos y para que el visitante reciba avisos claros.



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

## Novedades del Sprint 7

- **Validaciones del back-end con Express Validator** en el registro, el login y la creación y edición de productos.
- **Validaciones del front-end con JavaScript** (`public/js/validations.js`), con las mismas reglas, que muestran el aviso junto a cada campo antes de enviar el formulario.
- **Subida de imágenes controlada** (`src/middlewares/uploadImage.js`): solo se aceptan archivos JPG, JPEG, PNG y GIF de hasta 2 MB. Si el archivo no es válido, no se guarda en el servidor.
- Los formularios **conservan lo que el usuario escribió** cuando hay errores, y muestran el mensaje bajo cada campo.
- La contraseña del registro exige mayúsculas, minúsculas, número y carácter especial (parte opcional del sprint).

## Reglas de validación

### Registro de usuarios

| Campo | Reglas |
|---|---|
| Nombre y apellido | Obligatorios. Al menos 2 caracteres. |
| Correo | Obligatorio. Formato de correo válido. No puede estar ya registrado en la base de datos. |
| Contraseña | Obligatoria. Al menos 8 caracteres, con mayúscula, minúscula, número y carácter especial. |
| Confirmar contraseña | Debe coincidir con la contraseña. |
| Imagen de perfil | Opcional. Si se envía, debe ser JPG, JPEG, PNG o GIF. |

### Login de usuarios

| Campo | Reglas |
|---|---|
| Correo | Obligatorio. Formato válido. Debe existir en la base de datos. |
| Contraseña | Obligatoria. Debe coincidir con la guardada en la base de datos. |

### Creación y edición de productos

| Campo | Reglas |
|---|---|
| Nombre | Obligatorio. Al menos 5 caracteres. |
| Descripción | Obligatoria. Al menos 20 caracteres. |
| Categoría | Debe ser `hombre` o `mujer`. |
| Precio | Número entero mayor que 0. |
| Imagen | Opcional. Si se envía, debe ser JPG, JPEG, PNG o GIF. |

### Cómo se combinan

1. **Front-end:** al salir de un campo o al pulsar el botón, `validations.js` revisa los datos. Si hay errores, muestra los avisos y no envía el formulario. Esto ahorra peticiones al servidor y mejora la experiencia del visitante.
2. **Back-end:** cuando el formulario llega al servidor, Express Validator vuelve a revisar todo. Esta es la protección real, porque el JavaScript del navegador se puede deshabilitar. Algunas reglas solo existen aquí porque necesitan consultar la base de datos (correo repetido, correo que existe y contraseña correcta).
3. **Base de datos:** las restricciones de `structure.sql` (`NOT NULL`, `UNIQUE`, claves foráneas) son la última barrera.

## Base de datos

Motor: **MySQL** (se puede usar con XAMPP). ORM: **Sequelize**. El diagrama y los scripts siguen siendo los del Sprint 6.

![Diagrama entidad-relación de ESSENZA](docs/DER_essenza.png)

También está disponible en PDF: [`docs/DER_essenza.pdf`](docs/DER_essenza.pdf).

| Tabla | Descripción |
|---|---|
| `user_categories` | Categorías de usuario (`admin`, `cliente`) |
| `users` | Usuarios, con contraseña cifrada (bcrypt) |
| `categories` | Categorías de producto (`hombre`, `mujer`) |
| `products` | Perfumes |
| `colors` | Colores disponibles |
| `product_colors` | Tabla intermedia entre productos y colores |
| `carts` y `cart_items` | Carrito de compras (opcional, aún sin uso en el sitio) |

## Rutas

### Productos

| Método | Ruta | Acción | Validación |
|---|---|---|---|
| GET | `/products` | Listado, con buscador `?q=` y filtro `?category=` | – |
| GET | `/products/:id` | Detalle | – |
| GET | `/products/create` | Formulario de creación (con sesión) | – |
| POST | `/products` | Crear (con sesión) | Reglas de producto |
| GET | `/products/:id/edit` | Formulario de edición (con sesión) | – |
| PUT | `/products/:id` | Editar (con sesión) | Reglas de producto |
| DELETE | `/products/:id` | Eliminar (con sesión) | – |

### Usuarios

| Método | Ruta | Acción | Acceso | Validación |
|---|---|---|---|---|
| GET / POST | `/users/register` | Registro con imagen de perfil | Solo huéspedes | Reglas de registro |
| GET / POST | `/users/login` | Inicio de sesión (con "recordarme") | Solo huéspedes | Reglas de login |
| GET | `/users/profile` | Perfil | Con sesión | – |
| GET / PUT | `/users/profile/edit` y `/users/profile` | Editar perfil | Con sesión | Validación básica |
| GET | `/users/logout` | Cerrar sesión | Con sesión | – |

## Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express 4 | Servidor y rutas |
| EJS | Plantillas de las vistas |
| MySQL y Sequelize | Base de datos y ORM |
| **express-validator** | Validaciones del back-end |
| JavaScript (navegador) | Validaciones del front-end |
| express-session y cookie-parser | Sesiones y cookie de "recordarme" |
| bcryptjs | Cifrado de contraseñas |
| multer | Subida de imágenes, solo JPG, JPEG, PNG y GIF |
| method-override | `PUT` y `DELETE` desde formularios |

## Estructura del proyecto

```
Proyecto-Perfumeria/
├── app.js
├── package.json
├── .sequelizerc
├── docs/                     # DER_essenza.pdf y DER_essenza.png
├── scripts/seedUsers.js
├── public/
│   ├── css/styles.css
│   ├── js/validations.js     # Validaciones del front-end
│   ├── img/                  # Imágenes de productos
│   └── images/users/         # Imágenes de perfil
└── src/
    ├── database/             # Configuración y modelos de Sequelize, structure.sql y data.sql
    ├── controllers/          # cart, main, products y users
    ├── helpers/
    ├── middlewares/          # guest, auth, remember y uploadImage
    ├── routes/
    ├── validations/          # Reglas de Express Validator (userValidations y productValidations)
    └── views/
```

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- MySQL (por ejemplo [XAMPP](https://www.apachefriends.org/)) encendido en el puerto 3306

## Instalación y uso

1. Clona el repositorio y cambia a la rama del sprint:
   ```bash
   git clone https://github.com/juliangarnica1902/Proyecto-Perfumeria.git
   cd Proyecto-Perfumeria
   git checkout sprint7
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Enciende MySQL (en XAMPP, botón **Start** en MySQL).
4. En phpMyAdmin (http://localhost/phpmyadmin), sin seleccionar ninguna base, abre la pestaña **Importar** y ejecuta, en este orden:
   1. `src/database/structure.sql`
   2. `src/database/data.sql`
5. Inicia el servidor:
   ```bash
   npm start
   ```
6. Abre <http://localhost:3000> en el navegador.

Por defecto la conexión usa el usuario `root` sin contraseña, la base `essenza` y el servidor `127.0.0.1`. Se puede cambiar con las variables de entorno `DB_USER`, `DB_PASS`, `DB_NAME` y `DB_HOST`.

### Usuarios de ejemplo

| Correo | Contraseña | Categoría |
|---|---|---|
| admin@essenza.com | admin123 | admin |
| laura@correo.com | cliente123 | cliente |
| carlos@correo.com | cliente123 | cliente |

Estas cuentas ya existen en la base de datos. Las contraseñas nuevas que se registren desde el sitio deben cumplir las reglas de validación.

## Cómo probar las validaciones

1. **Front-end:** abre `/users/register` y pulsa **Registrarme** sin escribir nada. Deben aparecer los avisos en rojo bajo cada campo, sin recargar la página.
2. **Contraseña:** prueba con `abc` y luego con `Abcdef1!`. El primero muestra lo que falta, y el segundo es válido.
3. **Imagen:** sube un archivo `.pdf` como imagen de perfil. Debe rechazarlo.
4. **Back-end:** registra un correo que ya exista, por ejemplo `admin@essenza.com`. El aviso "Ese correo ya está registrado" viene del servidor.
5. **Login:** prueba con un correo que no existe y luego con una contraseña incorrecta.
6. **Productos:** en `/products/create`, usa un nombre de menos de 5 caracteres y una descripción de menos de 20.

## Entregables del Sprint 7

- `retro.md` con el resultado de la retrospectiva del Sprint 6.
- `daily.md` (opcional) con las opiniones sobre las dailies/weeklies.
- Tablero de trabajo actualizado (enlace al inicio de este documento).
- Validaciones del back-end con Express Validator: registro, login y creación y edición de productos.
- Validaciones del front-end con JavaScript: registro, login y creación y edición de productos.

## Limitaciones

- La edición del perfil tiene validaciones básicas en el servidor, pero no tiene las del front-end.
- Las validaciones de la contraseña con letras, número y símbolo solo se exigen al registrar una cuenta nueva.
- Todavía faltan por poner imágenes en la mayoría de los productos; se muestran con un frasco dibujado.
- Los perfumes de ejemplo tienen descripciones cortas, así que al editarlos hay que ampliarlas hasta 20 caracteres.
- El carrito se guarda en la sesión y no en las tablas `carts` y `cart_items`.
- Cualquier usuario con sesión puede crear, editar y eliminar productos. La restricción por rol (solo `admin`) queda pendiente.

## Próximos pasos

- Consumo de APIs y frontend con React (Sprint 8).
- Validar también la edición del perfil en el front-end.
- Guardar los pedidos del carrito en la base de datos.
- Restringir la administración de productos al rol `admin`.

## Autores

Ronaldo Becerra Gonzalez 
Diego Andrey Carreño Chaparro
Julian Rene Fernandez Garnica 

