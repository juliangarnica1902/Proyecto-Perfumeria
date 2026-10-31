const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberMiddleware = require('./src/middlewares/rememberMiddleware');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


app.locals.money = (n) => 'COP $' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
app.locals.WHATSAPP = '573142696125';
app.locals.waLink = (text) => `https://wa.me/${app.locals.WHATSAPP}?text=${encodeURIComponent(text)}`;

app.locals.hasImage = (img) => !!img && fs.existsSync(path.join(__dirname, 'public', img));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET || 'essenza-secreto', resave: false, saveUninitialized: false }));
app.use(rememberMiddleware);                                   // recuerda al usuario con la cookie
app.use((req, res, next) => { res.locals.user = req.session.user || null; next(); });

app.use('/ayuda', require('./src/routes/help'));
app.use('/cart', require('./src/routes/cart'));
app.use('/', require('./src/routes/main'));
app.use('/products', require('./src/routes/products'));
app.use('/users', require('./src/routes/users'));

app.listen(3000, () => console.log('ESSENZA en http://localhost:3000'));
