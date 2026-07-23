const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    payment_method: { type: DataTypes.STRING(50), allowNull: false },
    payment_status: { type: DataTypes.STRING(50), allowNull: false },
    payment_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
