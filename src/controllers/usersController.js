const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/userModel');

const safe = (u) => ({ id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email, category: u.category, image: u.image });
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

module.exports = {
  registerForm: (req, res) => res.render('users/register', { title: 'Crear cuenta', error: null, old: {} }),

  register(req, res) {
    const firstName = (req.body.firstName || '').trim();
    const lastName = (req.body.lastName || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';
    const old = { firstName, lastName, email };
    const fail = (error) => res.status(400).render('users/register', { title: 'Crear cuenta', error, old });

    if (!firstName || !lastName || !email || !password) return fail('Completa todos los campos.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail('El correo no es válido.');
    if (password.length < 8) return fail('La contraseña debe tener al menos 8 caracteres.');
    if (password !== req.body.password2) return fail('Las contraseñas no coinciden.');
    if (User.findByEmail(email)) return fail('Ese correo ya está registrado.');

    User.create({
      firstName, lastName, email,
      password: bcrypt.hashSync(password, 10),           // contraseña encriptada
      category: 'cliente',
      image: req.file ? '/images/users/' + req.file.filename : ''   // imagen de perfil (Multer)
    });
    res.redirect('/users/login');                         // tras registrarse, va a iniciar sesión
  },

  loginForm: (req, res) => res.render('users/login', { title: 'Ingresar', error: null, old: {} }),

  login(req, res) {
    const email = (req.body.email || '').trim().toLowerCase();
    const user = User.findByEmail(email);
    if (!user || !bcrypt.compareSync(req.body.password || '', user.password)) {
      return res.status(401).render('users/login', { title: 'Ingresar', error: 'Correo o contraseña incorrectos.', old: { email } });
    }
    req.session.user = safe(user);

    if (req.body.remember) {   // "Recordarme": cookie con un token aleatorio (se guarda su hash en el JSON)
      const token = crypto.randomBytes(32).toString('hex');
      User.update(user.id, { rememberToken: crypto.createHash('sha256').update(token).digest('hex') });
      res.cookie('remember', token, { maxAge: THIRTY_DAYS, httpOnly: true, sameSite: 'lax' });
    }
    res.redirect('/users/profile');
  },

  profile: (req, res) => res.render('users/profile', { title: 'Mi perfil', profile: User.findById(req.session.user.id) || req.session.user }),

  logout(req, res) {
    User.update(req.session.user.id, { rememberToken: '' });
    res.clearCookie('remember');
    req.session.destroy(() => res.redirect('/'));
  }
};
