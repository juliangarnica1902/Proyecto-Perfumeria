const Product = require('../models/productModel');

const getCart = (req) => req.session.cart || (req.session.cart = {}); // { idProducto: cantidad }
const buildItems = (req) => Object.entries(getCart(req))
  .map(([id, qty]) => { const p = Product.findById(id); return p && { ...p, product: p, qty }; })
  .filter(Boolean);

module.exports = {
  view(req, res) {
    const items = buildItems(req);
    const total = items.reduce((a, p) => a + p.price * p.qty, 0);
    const money = res.app.locals.money;
    const text = 'Hola ESSENZA, quiero comprar:\n' +
      items.map((p) => `• ${p.qty} x ${p.name} (${money(p.price * p.qty)})`).join('\n') +
      `\nTotal: ${money(total)}`;
    res.render('cart', { title: 'Tu carrito', items, total, subtotal: total, wa: res.app.locals.waLink(text) });
  },
  add(req, res) {
    const cart = getCart(req), id = req.params.id;
    if (Product.findById(id)) cart[id] = Math.min((cart[id] || 0) + 1, 20);
    res.redirect('/cart');
  },
  update(req, res) {
    const cart = getCart(req), q = parseInt(req.body.q, 10);
    if (q > 0) cart[req.params.id] = Math.min(q, 20); else delete cart[req.params.id];
    res.redirect('/cart');
  },
  remove(req, res) {
    delete getCart(req)[req.params.id];
    res.redirect('/cart');
  }
};
