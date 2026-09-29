const products = require('../data/products');
module.exports = {
  home: (req, res) => res.render('index', { title: 'Perfumería original', featured: products.slice(0, 3) }),
  cart: (req, res) => {
    const items = [ { product: products[0], qty: 1 }, { product: products[1], qty: 1 } ];
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    res.render('cart', { title: 'Carrito', items, subtotal });
  },
};
