module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    name: { type: DataTypes.STRING(30), allowNull: false, unique: true }
  }, { tableName: 'user_categories' });

  UserCategory.associate = (db) => {
    UserCategory.hasMany(db.User, { as: 'users', foreignKey: 'categoryId' });
  };
  return UserCategory;
};
