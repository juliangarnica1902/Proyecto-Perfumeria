module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '/img/default.jpg' },
    price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
  }, { tableName: 'products' });

  Product.associate = (db) => {
    Product.belongsTo(db.Category, { as: 'category', foreignKey: 'categoryId' });
    Product.belongsToMany(db.Color, { as: 'colors', through: 'product_colors', foreignKey: 'productId', otherKey: 'colorId', timestamps: false });
    Product.hasMany(db.CartItem, { as: 'cartItems', foreignKey: 'productId' });
  };
  return Product;
};
