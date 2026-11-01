const db = require('../database/models');
const toView = require('../helpers/productView');

const h = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const getCart = (req) => req.session.cart || (req.session.cart = {}); // { idProducto: cantidad }
const include = [{ model: db.Category, as: 'category' }, { model: db.Color, as: 'colors', through: { attributes: [] } }];

const buildItems = async (req) => {
  const items = [];
  for (const [id, qty] of Object.entries(getCart(req))) {
    const p = await db.Product.findByPk(id, { include });
    if (p) { const v = toView(p); items.push({ ...v, product: v, qty }); }
  }
  return items;
};

module.exports = {
  view: h(async (req, res) => {
    const items = await buildItems(req);
    const total = items.reduce((a, p) => a + p.price * p.qty, 0);
    const money = res.app.locals.money;
    const text = 'Hola ESSENZA, quiero comprar:\n' +
      items.map((p) => `• ${p.qty} x ${p.name} (${money(p.price * p.qty)})`).join('\n') + `\nTotal: ${money(total)}`;
    res.render('cart', { title: 'Tu carrito', items, total, subtotal: total, wa: res.app.locals.waLink(text) });
  }),
  add: h(async (req, res) => {
    const cart = getCart(req), id = req.params.id;
    if (await db.Product.findByPk(id)) cart[id] = Math.min((cart[id] || 0) + 1, 20);
    res.redirect('/cart');
  }),
  update(req, res) {
    const cart = getCart(req), q = parseInt(req.body.q, 10);
    if (q > 0) cart[req.params.id] = Math.min(q, 20); else delete cart[req.params.id];
    res.redirect('/cart');
  },
  remove(req, res) { delete getCart(req)[req.params.id]; res.redirect('/cart'); }
};
