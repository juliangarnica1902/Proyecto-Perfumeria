const router = require('express').Router();
const c = require('../controllers/productsController');
router.get('/', c.list);
router.get('/create', c.create);      // antes que '/:id' para que no se confunda
router.get('/:id', c.detail);
router.get('/:id/edit', c.edit);
module.exports = router;
