module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: { type: DataTypes.STRING(40), allowNull: false, unique: true }
  }, { tableName: 'colors', timestamps: false });

  Color.associate = (db) => {
    Color.belongsToMany(db.Product, { as: 'products', through: 'product_colors', foreignKey: 'colorId', otherKey: 'productId', timestamps: false });
  };
  return Color;
};
