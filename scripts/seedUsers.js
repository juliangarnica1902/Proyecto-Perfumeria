const bcrypt = require('bcryptjs');
const db = require('../src/database/models');

(async () => {
  const users = [
    { firstName: 'Admin', lastName: 'Essenza', email: 'admin@essenza.com', password: 'admin123', category: 'admin' },
    { firstName: 'Laura', lastName: 'Gómez', email: 'laura@correo.com', password: 'cliente123', category: 'cliente' },
    { firstName: 'Carlos', lastName: 'Pérez', email: 'carlos@correo.com', password: 'cliente123', category: 'cliente' }
  ];
  for (const u of users) {
    const [cat] = await db.UserCategory.findOrCreate({ where: { name: u.category } });
    await db.User.findOrCreate({
      where: { email: u.email },
      defaults: { firstName: u.firstName, lastName: u.lastName, password: bcrypt.hashSync(u.password, 10), categoryId: cat.id }
    });
  }
  console.log('Usuarios de ejemplo listos');
  await db.sequelize.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
