# Retrospectiva – Sprint 6

## 1. Comenzar a hacer 

- Verificar en qué rama estamos parados antes de crear una rama nueva, para partir siempre de la última versión del proyecto.
- Conseguir y subir las imágenes de todos los productos: todavía faltan por poner imágenes en la mayoría de los perfumes.
- Revisar los datos de la base de datos con el formato correcto antes de guardarlos (por ejemplo, las contraseñas siempre cifradas).
- Hacer una daily o weekly breve, al menos una vez por semana.

## 2. Hacer más 

- Hacer `git pull` antes de empezar a trabajar y antes de cada `push`, sobre todo en `master`, donde hubo un conflicto.
- Probar el proyecto en otro computador, desde cero, importando `structure.sql` y `data.sql`.
- Mantener el tablero actualizado y mover las tarjetas a medida que avanzan.
- Documentar en el README los pasos de instalación de la base de datos.

## 3. Continuar haciendo 

- Diseñar el diagrama entidad-relación antes de escribir el SQL.
- Separar el proyecto en controladores, rutas, modelos de Sequelize y vistas.
- Usar el buscador y el CRUD apoyados en la base de datos, con los mismos datos que usan las vistas.
- Cifrar las contraseñas con bcrypt.

## 4. Hacer menos 

- Dejar la documentación (README y retro) para el último momento.
- Dar pasos de instalación sin comprobarlos antes (por ejemplo, cambiar de carpeta o de rama con archivos sin guardar).
- Corregir detalles visuales al final del sprint.

## 5. Dejar de hacer 

- Editar datos directamente en phpMyAdmin sin respetar el formato, como escribir una contraseña en texto plano.
- Crear una rama nueva sin comprobar de cuál rama se parte, porque dejó el proyecto aparentemente vacío.
- Dar una tarea por terminada solo porque "se ve bien", sin probar todos los casos.

## Conclusiones principales

1. En el Sprint 6 pasamos de archivos JSON a una base de datos MySQL con Sequelize: tenemos diagrama, `structure.sql`, `data.sql`, modelos con relaciones y el CRUD de productos y usuarios funcionando, con buscador.
2. Perdimos tiempo con la instalación de MySQL, con el formato de los datos en phpMyAdmin y con las ramas de Git (una rama creada desde `master` y un conflicto en el README). Para el Sprint 7 vamos a comprobar cada paso antes de avanzar.
3. Todavía faltan por poner imágenes en varios productos: solo algunos tienen imagen propia y el resto se muestra con el frasco dibujado.
4. El Sprint 7 trata de validaciones. Conviene definir primero las reglas de cada formulario y aplicarlas en el back-end y en el front-end.

## Acciones para el Sprint 7

| Acción | Responsable | Plazo |
|---|---|---|
| Definir las reglas de validación de cada formulario antes de programarlas | _nombre_ | Inicio del sprint |
| Probar cada formulario con datos válidos e inválidos, en el front-end y en el back-end | _nombre_ | Todo el sprint |
| Conseguir y subir las imágenes que faltan de los productos | _nombre_ | Antes de la entrega |
| Comprobar la rama activa antes de crear ramas o de hacer `push` | _nombre_ | Todo el sprint |
| Actualizar el tablero y el README a medida que se avanza | _nombre_ | Todo el sprint |
