// Middleware de aplicación: si no hay sesión pero existe la cookie "remember" válida, inicia sesión
const crypto = require('crypto');
const db = require('../database/models');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.remember;
    if (!req.session.user && token) {
      const hash = crypto.createHash('sha256').update(token).digest('hex');
      const user = await db.User.findOne({ where: { rememberToken: hash }, include: [{ model: db.UserCategory, as: 'category' }] });
      if (user) {
        req.session.user = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image, category: user.category.name };
      } else {
        res.clearCookie('remember');
      }
    }
    next();
  } catch (err) { next(err); }
};
