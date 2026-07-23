const { DataTypes, Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    user_id: { type: DataTypes.CHAR(36), allowNull: true },
    order_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    created_by: { type: DataTypes.CHAR(36), allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    order_number: { type: DataTypes.STRING(50), allowNull: true },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "ready",
        "picked",
        "served",
        "completed"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    delivery_address: { type: DataTypes.TEXT, allowNull: true },
    order_type: {
      type: DataTypes.ENUM("online", "physical"),
      allowNull: false,
      defaultValue: "online",
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card"),
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.ENUM("paid", "not_paid"),
      allowNull: false,
      defaultValue: "not_paid",
    },
    received_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    customer_name: { type: DataTypes.STRING(255), allowNull: true },
    service_type: {
      type: DataTypes.ENUM("dine_in", "take_away"),
      allowNull: true,
    },
    notification: {
      type: DataTypes.ENUM("pending", "confirmed", "ready", "picked", "cancel"),
      allowNull: false,
      defaultValue: "pending",
    },
    notification_status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
  },
  {
    tableName: "orders",
    timestamps: true,
    indexes: [{ unique: true, fields: ["order_number", "created_by"] }],
  }
);

Order.beforeCreate(async (order) => {
  if (order.order_number) return;

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const prefix = `${day}${month}-RPOS-`;

  const lastOrder = await Order.findOne({
    where: {
      created_by: order.created_by,
      order_number: { [Op.like]: `${prefix}%` },
    },
    order: [["order_number", "DESC"]],
    attributes: ["order_number"],
  });

  let orderCount = 1;
  if (lastOrder && lastOrder.order_number) {
    const match = lastOrder.order_number.match(/(\d{3})$/);
    if (match) orderCount = parseInt(match[1], 10) + 1;
  }

  order.order_number = `${prefix}${String(orderCount).padStart(3, "0")}`;
});

module.exports = Order;
