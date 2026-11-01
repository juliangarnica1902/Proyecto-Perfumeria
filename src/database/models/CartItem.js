module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cartId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
  }, { tableName: 'cart_items' });

  CartItem.associate = (db) => {
    CartItem.belongsTo(db.Cart, { as: 'cart', foreignKey: 'cartId' });
    CartItem.belongsTo(db.Product, { as: 'product', foreignKey: 'productId' });
  };
  return CartItem;
};
