const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');
const Product = require('./Product');
const Category = require('./Category');

// Definir relaciones
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

module.exports = {
  sequelize,
  User,
  Role,
  Product,
  Category
};

