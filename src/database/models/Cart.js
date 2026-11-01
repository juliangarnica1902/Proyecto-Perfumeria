module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    total: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 }
  }, { tableName: 'carts' });

  Cart.associate = (db) => {
    Cart.belongsTo(db.User, { as: 'user', foreignKey: 'userId' });
    Cart.hasMany(db.CartItem, { as: 'items', foreignKey: 'cartId' });
  };
  return Cart;
};
