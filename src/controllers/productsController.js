const fs = require('fs');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const toView = require('../helpers/productView');

const h = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const withRelations = [
  { model: db.Category, as: 'category' },
  { model: db.Color, as: 'colors', through: { attributes: [] } }
];
const removeUpload = (req) => { if (req.file) fs.unlink(req.file.path, () => {}); };
const parseColors = (s) => (s || '').split(',').map((c) => c.trim()).filter(Boolean);
const categoryIdOf = async (name) => (await db.Category.findOrCreate({ where: { name: (name || 'hombre').trim().toLowerCase() } }))[0].id;
const setColors = async (product, names) => {
  const colors = [];
  for (const n of names) colors.push((await db.Color.findOrCreate({ where: { name: n } }))[0]);
  await product.setColors(colors);
};
const oldValues = (b) => ({ name: b.name, description: b.description, category: b.category, price: b.price, colors: b.colors });

module.exports = {
  list: h(async (req, res) => {
    const category = (req.query.category || '').toLowerCase();
    const q = (req.query.q || '').trim();
    const where = q ? { [Op.or]: [{ name: { [Op.like]: `%${q}%` } }, { description: { [Op.like]: `%${q}%` } }] } : {};
    const include = [{ model: db.Category, as: 'category', ...(category ? { where: { name: category } } : {}) }, withRelations[1]];
    const products = await db.Product.findAll({ where, include, order: [['id', 'ASC']] });
    res.render('products/list', { title: 'Perfumes', products: products.map(toView), category, q });
  }),

  detail: h(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, { include: withRelations });
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/detail', { title: product.name, product: toView(product) });
  }),

  createForm: (req, res) => res.render('products/create', { title: 'Nuevo producto', errors: {} }),

  store: h(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      removeUpload(req);
      return res.status(400).render('products/create', { title: 'Nuevo producto', errors: result.mapped(), product: oldValues(req.body) });
    }
    const product = await db.Product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? '/img/' + req.file.filename : '/img/default.jpg',
      price: Number(req.body.price),
      categoryId: await categoryIdOf(req.body.category)
    });
    await setColors(product, parseColors(req.body.colors));
    res.redirect('/products');
  }),

  editForm: h(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, { include: withRelations });
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('products/edit', { title: 'Editar producto', errors: {}, product: toView(product) });
  }),

  update: h(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) { removeUpload(req); return res.status(404).send('Producto no encontrado'); }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      removeUpload(req);
      return res.status(400).render('products/edit', {
        title: 'Editar producto', errors: result.mapped(),
        product: { ...oldValues(req.body), id: product.id, image: product.image }
      });
    }
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      categoryId: await categoryIdOf(req.body.category)
    };
    if (req.file) data.image = '/img/' + req.file.filename;
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
