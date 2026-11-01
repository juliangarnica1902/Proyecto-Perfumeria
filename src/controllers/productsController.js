const { Op } = require('sequelize');
const db = require('../database/models');
const toView = require('../helpers/productView');

const h = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next); // manejo de errores async
const withRelations = [
  { model: db.Category, as: 'category' },
  { model: db.Color, as: 'colors', through: { attributes: [] } }
];

const parseColors = (s) => (s || '').split(',').map((c) => c.trim()).filter(Boolean);
const categoryIdOf = async (name) => (await db.Category.findOrCreate({ where: { name: (name || 'hombre').trim().toLowerCase() } }))[0].id;
const setColors = async (product, names) => {
  const colors = [];
  for (const n of names) colors.push((await db.Color.findOrCreate({ where: { name: n } }))[0]);
  await product.setColors(colors);
};

module.exports = {
  // Listado + buscador (?q=) + filtro por categoría (?category=)
  list: h(async (req, res) => {
    const category = (req.query.category || '').toLowerCase();
    const q = (req.query.q || '').trim();
    const where = q ? { [Op.or]: [{ name: { [Op.like]: `%${q}%` } }, { description: { [Op.like]: `%${q}%` } }] } : {};
    const include = [
      { model: db.Category, as: 'category', ...(category ? { where: { name: category } } : {}) },
      withRelations[1]
    ];
    const products = await db.Product.findAll({ where, include, order: [['id', 'ASC']] });
    res.render('products/list', { title: 'Perfumes', products: products.map(toView), category, q });
  }),

  detail: h(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, { include: withRelations });
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/detail', { title: product.name, product: toView(product) });
  }),

  createForm: (req, res) => res.render('products/create', { title: 'Nuevo producto' }),

  store: h(async (req, res) => {
    const product = await db.Product.create({
      name: (req.body.name || '').trim(),
      description: (req.body.description || '').trim(),
      image: req.file ? '/img/' + req.file.filename : '/img/default.jpg',
      price: Number(req.body.price) || 0,
      categoryId: await categoryIdOf(req.body.category)
    });
    await setColors(product, parseColors(req.body.colors));
    res.redirect('/products');
  }),

  editForm: h(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, { include: withRelations });
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/edit', { title: 'Editar producto', product: toView(product) });
  }),

  update: h(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    const data = {
      name: (req.body.name || '').trim(),
      description: (req.body.description || '').trim(),
      price: Number(req.body.price) || 0,
      categoryId: await categoryIdOf(req.body.category)
    };
    if (req.file) data.image = '/img/' + req.file.filename;   // si no sube imagen, se conserva la anterior
    await product.update(data);
    await setColors(product, parseColors(req.body.colors));
    res.redirect('/products/' + product.id);
  }),

  destroy: h(async (req, res) => {
    const deleted = await db.Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).send('Producto no encontrado');
    res.redirect('/products');
  })
};
