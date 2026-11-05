
const base = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',          
  database: process.env.DB_NAME || 'essenza',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  define: { underscored: true }                 
};

module.exports = { development: base, test: base, production: base };
