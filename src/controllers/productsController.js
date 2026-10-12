const Product = require('../models/productModel');

// Convierte lo que llega del formulario en un producto con los tipos correctos
const parseBody = (b) => ({
  name: (b.name || '').trim(),
  description: (b.description || '').trim(),
  category: (b.category || 'hombre').trim().toLowerCase(),
  colors: (b.colors || '').split(',').map((c) => c.trim()).filter(Boolean),
  price: Number(b.price) || 0
});

module.exports = {
  list(req, res) {
    const category = (req.query.category || '').toLowerCase();
    let products = Product.findAll();
    if (category) products = products.filter((p) => p.category === category);
    res.render('products/list', { title: 'Perfumes', products, category });
  },

  detail(req, res) {
    const product = Product.findById(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/detail', { title: product.name, product });
  },

  createForm: (req, res) => res.render('products/create', { title: 'Nuevo producto' }),

  store(req, res) {
    const data = parseBody(req.body);
    data.image = req.file ? '/img/' + req.file.filename : '/img/default.jpg';
    Product.create(data);
    res.redirect('/products');
  },

  editForm(req, res) {
    const product = Product.findById(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/edit', { title: 'Editar producto', product });
  },

  update(req, res) {
    const data = parseBody(req.body);
    if (req.file) data.image = '/img/' + req.file.filename; // si no sube imagen, se conserva la anterior
    const product = Product.update(req.params.id, data);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.redirect('/products/' + product.id);
  },

  destroy(req, res) {
  if (!Product.delete(req.params.id)) return res.status(404).send('Producto no encontrado');
  res.redirect('/products');
}
  

};
