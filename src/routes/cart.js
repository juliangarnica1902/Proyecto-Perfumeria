const express = require('express');
const router = express.Router();
const c = require('../controllers/cartController');

router.get('/', c.view);
router.post('/add/:id', c.add);
router.post('/update/:id', c.update);
router.post('/remove/:id', c.remove);

module.exports = router;
