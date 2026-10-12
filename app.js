const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Formatea precios: 185000 -> COP $185.000
app.locals.money = (n) => 'COP $' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
app.locals.WHATSAPP = '573142696125';
app.locals.waLink = (text) => `https://wa.me/${app.locals.WHATSAPP}?text=${encodeURIComponent(text)}`;
// Devuelve true si el producto tiene una foto que existe dentro de public/
app.locals.hasImage = (img) => !!img && fs.existsSync(path.join(__dirname, 'public', img));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // lee los formularios
app.use(methodOverride('_method'));               // permite PUT y DELETE con ?_method=
app.use(session({ secret: process.env.SECRET || 'essenza-secreto', resave: false, saveUninitialized: false }));
app.use((req, res, next) => { res.locals.user = req.session.user || null; next(); }); // user disponible en todas las vistas

app.use('/cart', require('./src/routes/cart'));
app.use('/', require('./src/routes/main'));
app.use('/products', require('./src/routes/products'));
app.use('/users', require('./src/routes/users'));

app.listen(3000, () => console.log('ESSENZA en http://localhost:3000'));