const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const safe = (u) => ({ id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email, category: u.category });

module.exports = {
  registerForm: (req, res) => res.render('users/register', { title: 'Crear cuenta', error: null, old: {} }),

  register(req, res) {
    const firstName = (req.body.firstName || '').trim();
    const lastName = (req.body.lastName || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';
    const password2 = req.body.password2 || '';
    const old = { firstName, lastName, email };
    const fail = (error) => res.status(400).render('users/register', { title: 'Crear cuenta', error, old });

    if (!firstName || !lastName || !email || !password) return fail('Completa todos los campos.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail('El correo no es válido.');
    if (password.length < 8) return fail('La contraseña debe tener al menos 8 caracteres.');
    if (password !== password2) return fail('Las contraseñas no coinciden.');
    if (User.findByEmail(email)) return fail('Ese correo ya está registrado.');

    const user = User.create({ firstName, lastName, email, password: bcrypt.hashSync(password, 10), category: 'cliente' });
    req.session.user = safe(user); // inicia sesión al registrarse
    res.redirect('/');
  },

  loginForm: (req, res) => res.render('users/login', { title: 'Ingresar', error: null, old: {} }),

  login(req, res) {
    const email = (req.body.email || '').trim().toLowerCase();
    const user = User.findByEmail(email);
    if (!user || !bcrypt.compareSync(req.body.password || '', user.password)) {
      return res.status(401).render('users/login', { title: 'Ingresar', error: 'Correo o contraseña incorrectos.', old: { email } });
    }
    req.session.user = safe(user);
    res.redirect('/');
  },

  logout: (req, res) => req.session.destroy(() => res.redirect('/'))
};
