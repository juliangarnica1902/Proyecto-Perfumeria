// Conexión a MySQL. Se pueden cambiar con variables de entorno: DB_USER, DB_PASS, DB_NAME, DB_HOST
const base = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',          // en XAMPP, el usuario root no tiene contraseña
  database: process.env.DB_NAME || 'essenza',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  define: { underscored: true }                 // columnas en snake_case (first_name, category_id...)
};

module.exports = { development: base, test: base, production: base };
