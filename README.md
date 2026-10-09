Proyecto Perfumeria
# ESSENZA – Tienda de perfumes

Aplicación web de una perfumería desarrollada con **Node.js, Express y EJS**. Permite a los clientes registrarse, iniciar sesión, armar un carrito de compras y confirmar su pedido, que se continúa por **WhatsApp** con el resumen de la compra.

## Temática del sitio

ESSENZA es una perfumería en línea de fragancias de autor. El sitio transmite elegancia y exclusividad con una estética oscura y dorada, y presenta cada perfume con sus notas olfativas para que el cliente elija con información clara. La compra es sencilla: se arma el carrito y el pedido se cierra con atención personalizada por WhatsApp.

Público objetivo

- Adultos de 18 a 45 años que compran perfumes para uso personal o como regalo.
- Personas que prefieren comprar desde el celular y resolver dudas de forma directa por WhatsApp.
- Clientes que buscan fragancias cuidadas y diferentes a las de las grandes marcas comerciales.
- Compradores de fechas especiales (cumpleaños, aniversarios, Día de la Madre, Navidad).

Referentes

Sitios de perfumería que sirvieron de inspiración para el diseño y la experiencia de compra:

Referente Sitio  Qué se tomó como referencia 
Sephora  https://www.sephora.com Catálogo por categorías y tarjetas de producto claras 
Notino  https://www.notino.es Precios visibles y proceso de compra directo 
Douglas  https://www.douglas.es  Organización del catálogo y presentación de fragancias 
Jo Malone London  https://www.jomalone.com  Imagen elegante y descripción de notas olfativas 
Le Labo  https://www.lelabofragrances.com  Estilo minimalista y marca de perfumería de autor 
Byredo  https://www.byredo.com  Diseño sobrio y enfoque en la identidad de marca 

 Funcionalidades

- Registro de usuarios con validación de datos y correo único.
- Inicio y cierre de sesión (contraseñas cifradas con bcrypt, sesiones con express-session).
- Catálogo de perfumes con nombre, notas olfativas y precio.
- Carrito de compras: agregar, cambiar cantidades y quitar productos.
- Checkout protegido: solo usuarios con sesión iniciada pueden comprar.
- Selección de método de pago (Transferencia / Nequi, Tarjeta o Contraentrega).
- Registro del pedido y redirección a WhatsApp con el detalle listo para enviar.

 Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express 4 | Servidor y rutas |
| EJS | Plantillas de las vistas |
| express-session | Manejo de sesiones y carrito |
| bcryptjs | Cifrado de contraseñas |
| HTML + CSS | Interfaz (tema oscuro y dorado) |

 Estructura del proyecto

essenza/
├── server.js          # Servidor, rutas y lógica de negocio
├── products.js        # Catálogo de productos
├── package.json
├── data/              # users.json y orders.json (se crean solos)
├── public/
│   └── style.css      # Estilos
└── views/
    ├── partials/      # head.ejs y foot.ejs (encabezado y pie)
    ├── shop.ejs       # Catálogo
    ├── cart.ejs       # Carrito
    ├── auth.ejs       # Login y registro
    ├── checkout.ejs   # Datos de entrega y pago
    └── done.ejs       # Confirmación y enlace a WhatsApp

## Flujo de compra

1. El cliente agrega perfumes al carrito.
2. Al continuar, inicia sesión o se registra.
3. Indica teléfono, dirección y método de pago.
4. El pedido se guarda en `data/orders.json`.
5. Se abre WhatsApp con el resumen del pedido para coordinar el pago y el envío.

 Limitaciones

- El pago **no se procesa en línea**: el cobro se coordina por WhatsApp. No se almacenan datos de tarjetas.
- Usuarios y pedidos se guardan en archivos JSON, suficiente para fines académicos. Para producción se recomienda una base de datos.
- Cambia el valor de `SECRET` antes de publicar la aplicación.

 Mejoras futuras

- Página "Mis pedidos" para cada usuario.
- Integración con una pasarela de pago (Wompi, Mercado Pago).
- Base de datos (MySQL, PostgreSQL o MongoDB).
- Panel de administración para gestionar productos y pedidos.

Autor
 Ronaldo Becerra Gonzalez 
 Diego Andrey Carreño Chaparro 
 Julian Rene Fernandez Garnica 
