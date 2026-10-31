const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const c = require('../controllers/productsController');
const auth = require('../middlewares/authMiddleware');

// Subida de imágenes a public/img
const dir = path.join(__dirname, '..', '..', 'public', 'img');
fs.mkdirSync(dir, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: dir,
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/'))
});

router.get('/', c.list);                                        // Listado (cualquiera)
router.get('/create', auth, c.createForm);                      // Formulario de creación (con login)
router.get('/:id', c.detail);                                   // Detalle (cualquiera)
router.post('/', auth, upload.single('image'), c.store);        // Crear (con login)
router.get('/:id/edit', auth, c.editForm);                      // Formulario de edición (con login)
router.put('/:id', auth, upload.single('image'), c.update);     // Editar (con login)
router.delete('/:id', auth, c.destroy);                         // Borrar (con login)

module.exports = router;
