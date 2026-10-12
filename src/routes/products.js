const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const c = require('../controllers/productsController');

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

router.get('/', c.list);                               // 1. Listado
router.get('/create', c.createForm);                   // 2. Formulario de creación
router.get('/:id', c.detail);                          // 3. Detalle
router.post('/', upload.single('image'), c.store);     // 4. Crear
router.get('/:id/edit', c.editForm);                   // 5. Formulario de edición
router.put('/:id', upload.single('image'), c.update);  // 6. Editar
router.delete('/:id', c.destroy);                      // 7. Borrar

module.exports = router;
