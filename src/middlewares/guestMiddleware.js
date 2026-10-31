// Rutas solo para huéspedes (sin login): si ya hay sesión, redirige al perfil
module.exports = (req, res, next) => (req.session.user ? res.redirect('/users/profile') : next());
