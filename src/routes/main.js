const router = require('express').Router();
const c = require('../controllers/mainController');
router.get('/', c.home);
router.get('/cart', c.cart);
module.exports = router;
