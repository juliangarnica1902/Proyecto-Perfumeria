// Genera src/data/users.json con contraseñas cifradas.  Uso: node scripts/seedUsers.js
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const users = [
  { id: 1, firstName: 'Admin', lastName: 'Essenza', email: 'admin@essenza.com', password: 'admin123', category: 'admin' },
  { id: 2, firstName: 'Laura', lastName: 'Gómez', email: 'laura@correo.com', password: 'cliente123', category: 'cliente' },
  { id: 3, firstName: 'Carlos', lastName: 'Pérez', email: 'carlos@correo.com', password: 'cliente123', category: 'cliente' }
].map((u) => ({ ...u, password: bcrypt.hashSync(u.password, 10) }));
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'users.json'), JSON.stringify(users, null, 2));
console.log('users.json creado con', users.length, 'usuarios');
