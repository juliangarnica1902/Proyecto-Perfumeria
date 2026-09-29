const router = require('express').Router();
const c = require('../controllers/usersController');
router.get('/register', c.register);
router.get('/login', c.login);
module.exports = router;
