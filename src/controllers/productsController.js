const products = require('../data/products');
const find = (id) => products.find(p => p.id === Number(id));
module.exports = {
  list: (req, res) => {
    const { category } = req.query;
    const list = category ? products.filter(p => p.category === category) : products;
    res.render('products/list', { title: 'Perfumes', products: list, category: category || '' });
  },
  detail: (req, res) => {
    const product = find(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/detail', { title: product.name, product });
  },
  create: (req, res) => res.render('products/create', { title: 'Nuevo producto' }),
  edit: (req, res) => {
    const product = find(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/edit', { title: 'Editar ' + product.name, product });
  },
};
