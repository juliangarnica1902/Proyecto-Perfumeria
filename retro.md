# Retrospectiva – Sprint 5

## 1. Comenzar a hacer 

- Probar cada pantalla en el navegador antes de dar la tarea por terminada, incluidos los botones y enlaces.
- Revisar los nombres de los archivos antes de subirlos a Git (por ejemplo, evitar espacios como en `README .md`).
- Escribir las decisiones de diseño de la base de datos (tablas, relaciones) antes de programar.
- Conseguir y subir las imágenes de todos los productos: todavía faltan por poner imágenes en la mayoría de los perfumes, que por ahora se ven con un frasco dibujado.
- Hacer una daily o weekly breve, al menos una vez por semana.

## 2. Hacer más 

- Hacer `git pull` antes de empezar a trabajar y antes de cada `push`.
- Repartir las tareas en el tablero y mover las tarjetas a medida que avanzan.
- Probar el proyecto en un segundo computador, desde cero, con `npm install` y `npm start`.
- Dejar el README al día con cada cambio importante.

## 3. Continuar haciendo 

- Separar el proyecto en rutas, controladores y vistas, y usar middlewares para proteger las rutas.
- Mantener el diseño consistente en todo el sitio (tema oscuro y dorado).
- Cifrar las contraseñas con bcrypt y no guardarlas nunca en texto plano.
- Hacer commits con mensajes claros.

## 4. Hacer menos

- Dejar la documentación (README y retro) para el último momento.
- Corregir detalles visuales (imágenes, estilos) al final del sprint, cuando ya hay poco tiempo.
- Dejar formularios y enlaces como maqueta sin conectarlos al servidor.

## 5. Dejar de hacer 

- Editar datos importantes directamente en la base de datos sin revisar el formato (por ejemplo, escribir una contraseña sin cifrar).
- Subir cambios sin comprobar en qué rama se está trabajando.
- Dar una tarea por terminada solo porque "se ve bien", sin comprobar que funciona.

## Conclusiones principales

1. En el Sprint 5 logramos el flujo completo de usuarios: registro con imagen de perfil, login, recordarme, perfil y rutas separadas para huéspedes y usuarios con sesión.
2. Varios detalles (imágenes que se salían de su recuadro, enlaces del pie de página sin función, formularios sin conectar) se corrigieron al final. Para el Sprint 6 vamos a revisarlos mientras desarrollamos.
3. Todavía faltan por poner imágenes en varios productos: solo algunos tienen imagen propia y el resto se muestra con el frasco dibujado. Hay que reunirlas y subirlas desde el formulario de edición.
4. El Sprint 6 es el cambio más grande hasta ahora: pasar de JSON a una base de datos. Conviene diseñar primero el diagrama y las tablas, y dejar la instalación documentada en el README.

## Acciones para el Sprint 6

| Acción | Responsable | Plazo |
|---|---|---|
| Diseñar el diagrama de la base de datos antes de escribir el SQL | _nombre_ | Inicio del sprint |
| Probar la importación de `structure.sql` y `data.sql` en otro computador | _nombre_ | Antes de la entrega |
| Conseguir y subir las imágenes que faltan de los productos | _nombre_ | Antes de la entrega |
| Hacer `git pull` antes de trabajar y antes de cada `push` | _nombre_ | Todo el sprint |
| Actualizar el tablero a medida que se avanza | _nombre_ | Todo el sprint |
| Documentar en el README cómo instalar y poblar la base de datos | _nombre_ | Todo el sprint |
