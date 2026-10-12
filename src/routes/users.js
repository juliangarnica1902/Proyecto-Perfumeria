const express = require('express');
const router = express.Router();
const c = require('../controllers/usersController');

router.get('/register', c.registerForm);
router.post('/register', c.register);
router.get('/login', c.loginForm);
router.post('/login', c.login);
router.get('/logout', c.logout);

module.exports = router;
