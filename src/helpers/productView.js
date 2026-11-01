// Convierte un producto de Sequelize en un objeto simple con la misma forma que usaban las vistas con JSON
module.exports = (p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  image: p.image,
  price: p.price,
  category: p.category ? p.category.name : '',
  colors: (p.colors || []).map((c) => c.name)
});
