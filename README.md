# ESSENZA – Tienda de perfumes

Proyecto del **Trabajo Integrador**: una tienda en línea de perfumes de autor, desarrollada por sprints con **Node.js, Express y EJS**. Cada sprint está en su propia rama, y esta página resume todo el recorrido.

🔗 **Tablero de trabajo:** <PEGA_AQUÍ_EL_ENLACE_A_TU_TABLERO>

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

## Recorrido por sprints

| Sprint | Tema | Qué se entregó | Rama |
|---|---|---|---|
| 1 | Wireframe y boceto | Definición de la idea, público y referentes, y la página de inicio | [`sprint1`](https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint1) |
| 2 | HTML y CSS | Maqueta del sitio: inicio, detalle del producto, carrito, registro y login | [`sprint2`](https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint2) |
| 3 | Template engines | Aplicación con Express y EJS, con archivos parciales y vistas dinámicas | [`sprint3`](https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint3) |
| 4 | JSON y métodos HTTP | Productos y usuarios en JSON, y CRUD completo de productos con carga de imágenes | [`sprint4`](https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint4) |
| 5 | Middlewares y autenticación | Registro con imagen de perfil, login, "recordarme", perfil y rutas para huéspedes y usuarios | [`sprint5`](https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint5) |
| 6 | Bases de datos | Base de datos MySQL con Sequelize, diagrama entidad-relación, scripts SQL y CRUD de productos y usuarios | [`sprint6`](https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint6) |
| 7 | Validaciones | Pendiente | – |


Cada rama incluye su propio `README.md` con el detalle del sprint y su `retro.md` con la retrospectiva.

## Funcionalidades actuales

- Catálogo de perfumes con filtro por categoría y buscador.
- Detalle de producto, y creación, edición y eliminación de productos con subida de imágenes.
- Registro e inicio de sesión de usuarios, con contraseña cifrada y opción de recordar la sesión.
- Perfil de usuario con edición de datos, e imagen de perfil.
- Carrito de compras y pedido por WhatsApp.
- Página de ayuda con políticas y preguntas frecuentes.
- Base de datos MySQL manejada con Sequelize.

## Tecnologías

Node.js · Express · EJS · MySQL · Sequelize · express-session · bcryptjs · multer · HTML y CSS

## Cómo ejecutar la última versión

La versión más reciente está en la rama `sprint6`.

```bash
git clone https://github.com/juliangarnica1902/Proyecto-Perfumeria.git
cd Proyecto-Perfumeria
git checkout sprint6
npm install
```

Después, enciende MySQL (por ejemplo, con XAMPP), importa `src/database/structure.sql` y luego `src/database/data.sql` en phpMyAdmin, y ejecuta:

```bash
npm start
```

Abre <http://localhost:3000>. El detalle completo está en el README de la rama `sprint6`.

**Usuario de ejemplo:** `admin@essenza.com` con la contraseña `admin123`.

## Autores

Ronaldo Becerra 
Andrey Carreño Chaparro 
Julian Rene Fernandez Garnica 
Sergio Cardenas 
