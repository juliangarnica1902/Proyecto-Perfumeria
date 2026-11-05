const db = require('../database/models');
const toView = require('../helpers/productView');

module.exports = {
 
  home: async (req, res, next) => {
    try {
      const rows = await db.Product.findAll({
        limit: 3,
        order: [['id', 'ASC']],
        include: [
          { model: db.Category, as: 'category' },
          { model: db.Color, as: 'colors', through: { attributes: [] } }
        ]
      });
      res.render('index', { title: 'Perfumería original', featured: rows.map(toView) });
    } catch (err) {
      next(err);
    }
  },

  
  cart: (req, res) => res.redirect('/cart')
};