const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const c = require('../controllers/usersController');
const guest = require('../middlewares/guestMiddleware');
const auth = require('../middlewares/authMiddleware');

// Imágenes de perfil en public/images/users
const dir = path.join(__dirname, '..', '..', 'public', 'images', 'users');
fs.mkdirSync(dir, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: dir,
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/'))
});

// Rutas de huéspedes (solo sin login)
router.get('/register', guest, c.registerForm);
router.post('/register', guest, upload.single('image'), c.register);
router.get('/login', guest, c.loginForm);
router.post('/login', guest, c.login);

// Rutas de usuarios (solo con login)
router.get('/profile', auth, c.profile);
router.get('/logout', auth, c.logout);

module.exports = router;
