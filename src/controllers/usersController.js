const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const h = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const sha = (t) => crypto.createHash('sha256').update(t).digest('hex');
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const removeUpload = (req) => { if (req.file) fs.unlink(req.file.path, () => {}); };   // borra la imagen si el formulario no es válido

const safe = (u, categoryName) => ({
  id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email, image: u.image,
  category: categoryName || (u.category && u.category.name) || 'cliente'
});

module.exports = {
  registerForm: (req, res) => res.render('users/register', { title: 'Crear cuenta', errors: {}, old: {} }),

  register: h(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      removeUpload(req);
      const { firstName, lastName, email } = req.body;
      return res.status(400).render('users/register', { title: 'Crear cuenta', errors: result.mapped(), old: { firstName, lastName, email } });
    }
    const [category] = await db.UserCategory.findOrCreate({ where: { name: 'cliente' } });
    await db.User.create({
      firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      image: req.file ? '/images/users/' + req.file.filename : '',
      categoryId: category.id
    });
    res.redirect('/users/login');
  }),

  loginForm: (req, res) => res.render('users/login', { title: 'Ingresar', errors: {}, old: {} }),

  login: h(async (req, res) => {
    const result = validationResult(req);
    const old = { email: req.body.email };
    if (!result.isEmpty()) return res.status(400).render('users/login', { title: 'Ingresar', errors: result.mapped(), old });

    const user = await db.User.findOne({ where: { email: req.body.email }, include: [{ model: db.UserCategory, as: 'category' }] });
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).render('users/login', { title: 'Ingresar', errors: { password: { msg: 'La contraseña no es correcta.' } }, old });
    }
    req.session.user = safe(user);
    if (req.body.remember) {
      const token = crypto.randomBytes(32).toString('hex');
      await user.update({ rememberToken: sha(token) });
      res.cookie('remember', token, { maxAge: THIRTY_DAYS, httpOnly: true, sameSite: 'lax' });
    }
    res.redirect('/users/profile');
  }),

  profile: h(async (req, res) => {
    const profile = await db.User.findByPk(req.session.user.id, { include: [{ model: db.UserCategory, as: 'category' }] });
    if (!profile) return res.redirect('/users/logout');
    res.render('users/profile', { title: 'Mi perfil', profile: { ...profile.toJSON(), category: profile.category.name } });
  }),

  editForm: h(async (req, res) => {
    const profile = await db.User.findByPk(req.session.user.id);
    res.render('users/edit', { title: 'Editar perfil', error: null, profile: profile.toJSON() });
  }),

  update: h(async (req, res) => {
    const user = await db.User.findByPk(req.session.user.id, { include: [{ model: db.UserCategory, as: 'category' }] });
    const firstName = (req.body.firstName || '').trim();
    const lastName = (req.body.lastName || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const fail = (error) => { removeUpload(req); return res.status(400).render('users/edit', { title: 'Editar perfil', error, profile: { ...user.toJSON(), firstName, lastName, email } }); };

    if (req.fileError) return fail(req.fileError);
    if (firstName.length < 2 || lastName.length < 2 || !EMAIL_RE.test(email)) return fail('Completa nombre, apellido (mínimo 2 caracteres) y un correo válido.');
    const other = await db.User.findOne({ where: { email } });
    if (other && other.id !== user.id) return fail('Ese correo ya lo usa otra cuenta.');

    const data = { firstName, lastName, email };
    if (req.body.password) {
      if (req.body.password.length < 8) return fail('La nueva contraseña debe tener al menos 8 caracteres.');
      if (req.body.password !== req.body.password2) return fail('Las contraseñas no coinciden.');
      data.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.file) data.image = '/images/users/' + req.file.filename;
    await user.update(data);
    req.session.user = safe(user);
    res.redirect('/users/profile');
  }),

  logout: h(async (req, res) => {
    await db.User.update({ rememberToken: null }, { where: { id: req.session.user.id } });
    res.clearCookie('remember');
    req.session.destroy(() => res.redirect('/'));
  })
};
