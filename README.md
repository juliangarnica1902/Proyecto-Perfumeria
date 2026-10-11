# ESSENZA – Tienda de perfumes (Sprint 3)

Aplicación web de una perfumería desarrollada con **Node.js, Express y EJS**. Permite a los clientes registrarse, iniciar sesión, armar un carrito de compras y confirmar su pedido, que se continúa por **WhatsApp** con el resumen de la compra.

## Tablero de trabajo

🔗 https://github.com/juliangarnica1902/Proyecto-Perfumeria/tree/sprint3

## Temática del sitio

ESSENZA es una perfumería en línea de fragancias de autor. El sitio transmite elegancia y exclusividad con una estética oscura y dorada, y presenta cada perfume con sus notas olfativas para que el cliente elija con información clara. La compra es sencilla: se arma el carrito y el pedido se cierra con atención personalizada por WhatsApp.

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
| Jo Malone London | https://www.jomalone.com | Imagen elegante y descripción de notas olfativas |
| Le Labo | https://www.lelabofragrances.com | Estilo minimalista y marca de perfumería de autor |
| Byredo | https://www.byredo.com | Diseño sobrio y enfoque en la identidad de marca |

## Funcionalidades

- Archivos parciales de EJS (`head` y `foot`) reutilizados en todas las vistas.
- Home con el listado de productos.
- Registro de usuarios con validación de datos y correo único.
- Inicio y cierre de sesión (contraseñas cifradas con bcrypt, sesiones con express-session).
- Carrito de compras: agregar, cambiar cantidades y quitar productos.
- Checkout protegido: solo usuarios con sesión iniciada pueden comprar.
- Selección de método de pago (Transferencia / Nequi, Tarjeta o Contraentrega).
- Registro del pedido y redirección a WhatsApp con el detalle listo para enviar.

## Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express 4 | Servidor y rutas |
| EJS | Plantillas de las vistas |
| express-session | Manejo de sesiones y carrito |
| bcryptjs | Cifrado de contraseñas |
| HTML + CSS | Interfaz (tema oscuro y dorado) |

## Estructura del proyecto

```
essenza/
├── server.js          # Servidor, rutas y lógica de negocio
├── products.js        # Catálogo de productos
├── package.json
├── data/              # users.json y orders.json (se crean solos)
├── public/
│   └── style.css      # Estilos
└── views/
    ├── partials/      # head.ejs y foot.ejs
    ├── shop.ejs       # Home y listado de productos
    ├── cart.ejs       # Carrito
    ├── auth.ejs       # Login y registro
    ├── checkout.ejs   # Datos de entrega y pago
    └── done.ejs       # Confirmación y enlace a WhatsApp
```

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

## Instalación y uso

1. Clona el repositorio y cambia a la rama del sprint:
   ```bash
   git clone https://github.com/<tu-usuario>/WEB_perfumeria.git
   cd WEB_perfumeria
   git checkout sprint3-ejs
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el número de WhatsApp de la tienda (código de país + número, sin `+` ni espacios):
   ```bash
   # Git Bash / Linux / macOS
   export WA_NUMBER=573001234567
   # PowerShell
   $env:WA_NUMBER="573001234567"
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. Abre <http://localhost:3000> en el navegador.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `WA_NUMBER` | WhatsApp de la tienda que recibe los pedidos | `573000000000` |
| `SECRET` | Secreto para firmar las sesiones | `cambia-este-secreto` |
| `PORT` | Puerto del servidor | `3000` |

## Flujo de compra

1. El cliente agrega perfumes al carrito.
2. Al continuar, inicia sesión o se registra.
3. Indica teléfono, dirección y método de pago.
4. El pedido se guarda en `data/orders.json`.
5. Se abre WhatsApp con el resumen del pedido para coordinar el pago y el envío.

## Entregables del sprint

- `retro.md` con el resultado de la retrospectiva.
- Tablero de trabajo actualizado (enlace arriba).
- Aplicación Node.js + Express + EJS.

## Limitaciones

- El pago **no se procesa en línea**: el cobro se coordina por WhatsApp. No se almacenan datos de tarjetas.
- Usuarios y pedidos se guardan en archivos JSON, suficiente para fines académicos.
- Cambia el valor de `SECRET` antes de publicar la aplicación.

## Mejoras futuras

- Página de detalle de cada producto.
- Formulario de carga y edición de productos.
- Página "Mis pedidos" para cada usuario.
- Integración con una pasarela de pago (Wompi, Mercado Pago).
- Base de datos (MySQL, PostgreSQL o MongoDB).

## Autor

Ronaldo Becerra Gonzalez Diego Andrey Carreño Chaparro Julian Rene Fernandez Garnica