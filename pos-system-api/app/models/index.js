const sequelize = require("../db/sequelize");
const User = require("./User");
const WorkerProfile = require("./WorkerProfile");
const CustomerProfile = require("./CustomerProfile");
const Role = require("./Role");
const Permission = require("./Permission");
const RolePermission = require("./RolePermission");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Queue = require("./Queue");
const Payment = require("./Payment");

// User associations
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Role.hasMany(User, { foreignKey: "role_id", as: "users" });

User.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(User, { foreignKey: "created_by", as: "createdUsers" });

User.hasOne(WorkerProfile, { foreignKey: "user_id", as: "workerProfile" });
WorkerProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasOne(CustomerProfile, { foreignKey: "user_id", as: "customerProfile" });
CustomerProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Role ↔ Permission M:N
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  otherKey: "permission_id",
  as: "permissions",
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
  otherKey: "role_id",
  as: "roles",
});

RolePermission.belongsTo(Role, { foreignKey: "role_id" });
RolePermission.belongsTo(Permission, { foreignKey: "permission_id" });

// Catalog
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Orders
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Product.hasMany(OrderItem, { foreignKey: "product_id", as: "orderItems" });

Order.belongsTo(User, { foreignKey: "user_id", as: "customer" });
Order.belongsTo(User, { foreignKey: "created_by", as: "creator" });

Order.hasOne(Queue, { foreignKey: "order_id", as: "queue" });
Queue.belongsTo(Order, { foreignKey: "order_id", as: "order" });

module.exports = {
  sequelize,
  User,
  WorkerProfile,
  CustomerProfile,
  Role,
  Permission,
  RolePermission,
  Category,
  Product,
  Order,
  OrderItem,
  Queue,
  Payment,
};
