module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(40), allowNull: false, unique: true }
  }, { tableName: 'categories' });

  Category.associate = (db) => {
    Category.hasMany(db.Product, { as: 'products', foreignKey: 'categoryId' });
  };
  return Category;
};
