const express = require('express');
const path = require('path');
const router = express.Router();
const c = require('../controllers/productsController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadImage')(path.join(__dirname, '..', '..', 'public', 'img'));
const { productRules } = require('../validations/productValidations');

router.get('/', c.list);                                                         
router.get('/create', auth, c.createForm);                                       
router.get('/:id', c.detail);                                                   
router.post('/', auth, upload.single('image'), productRules, c.store);          
router.get('/:id/edit', auth, c.editForm);                                        
router.put('/:id', auth, upload.single('image'), productRules, c.update);         
router.delete('/:id', auth, c.destroy);                                           

module.exports = router;
