const router = require('express').Router();
const c = require('../controllers/pageController');
router.get('/', c.home);
router.get('/producto/:id', c.productDetail);
router.get('/carrito', c.cart);
router.get('/registro', c.register);
router.get('/login', c.login);
module.exports = router;
