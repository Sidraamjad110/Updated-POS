const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    order_id: { type: DataTypes.CHAR(36), allowNull: false },
    product_id: { type: DataTypes.CHAR(36), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    sub_total: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    created_by: { type: DataTypes.CHAR(36), allowNull: false },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);

module.exports = OrderItem;
