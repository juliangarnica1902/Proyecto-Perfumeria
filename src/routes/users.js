const express = require('express');
const path = require('path');
const router = express.Router();
const c = require('../controllers/usersController');
const guest = require('../middlewares/guestMiddleware');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadImage')(path.join(__dirname, '..', '..', 'public', 'images', 'users'));
const { registerRules, loginRules } = require('../validations/userValidations');

// Huéspedes (solo sin login)
router.get('/register', guest, c.registerForm);
router.post('/register', guest, upload.single('image'), registerRules, c.register);
router.get('/login', guest, c.loginForm);
router.post('/login', guest, loginRules, c.login);

// Usuarios (solo con login)
router.get('/profile', auth, c.profile);
router.get('/profile/edit', auth, c.editForm);
router.put('/profile', auth, upload.single('image'), c.update);
router.get('/logout', auth, c.logout);

module.exports = router;
