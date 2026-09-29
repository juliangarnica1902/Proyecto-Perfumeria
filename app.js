const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Formatea precios: 185000 -> COP $185.000
app.locals.money = (n) => 'COP $' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
app.locals.WHATSAPP = '573142696125';
app.locals.waLink = (text) => `https://wa.me/${app.locals.WHATSAPP}?text=${encodeURIComponent(text)}`;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes/main'));
app.use('/products', require('./src/routes/products'));
app.use('/users', require('./src/routes/users'));

app.listen(3000, () => console.log('ESSENZA en http://localhost:3000'));
