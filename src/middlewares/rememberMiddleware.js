// Middleware de aplicación: si no hay sesión pero existe la cookie "remember" válida, inicia sesión
const crypto = require('crypto');
const User = require('../models/userModel');

module.exports = (req, res, next) => {
  const token = req.cookies && req.cookies.remember;
  if (!req.session.user && token) {
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const user = User.findByToken(hash);
    if (user) {
      req.session.user = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, category: user.category, image: user.image };
    } else {
      res.clearCookie('remember'); 
    }
  }
  next();
};
