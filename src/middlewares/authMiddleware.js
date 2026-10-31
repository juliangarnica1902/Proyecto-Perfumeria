// Rutas solo para usuarios con login: si no hay sesión, redirige al login
module.exports = (req, res, next) => (req.session.user ? next() : res.redirect('/users/login'));
