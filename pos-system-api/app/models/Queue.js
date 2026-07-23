const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Queue = sequelize.define(
  "Queue",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    order_id: { type: DataTypes.CHAR(36), allowNull: false },
    order_number: { type: DataTypes.STRING(50), allowNull: false },
    preparation_time: { type: DataTypes.INTEGER, allowNull: false },
    confirmed_at: { type: DataTypes.DATE, allowNull: false },
    estimated_completion: { type: DataTypes.DATE, allowNull: false },
    created_by: { type: DataTypes.CHAR(36), allowNull: false },
  },
  {
    tableName: "queues",
    timestamps: true,
  }
);

module.exports = Queue;
