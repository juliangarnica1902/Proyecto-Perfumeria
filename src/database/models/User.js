module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING(60), allowNull: false },
    lastName: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    image: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '' },
    rememberToken: { type: DataTypes.STRING(64), allowNull: true },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
  }, { tableName: 'users' });

  User.associate = (db) => {
    User.belongsTo(db.UserCategory, { as: 'category', foreignKey: 'categoryId' });
    User.hasMany(db.Cart, { as: 'carts', foreignKey: 'userId' });
  };
  return User;
};
