module.exports = {
  register: (req, res) => res.render('users/register', { title: 'Registro' }),
  login: (req, res) => res.render('users/login', { title: 'Iniciar sesión' }),
};
