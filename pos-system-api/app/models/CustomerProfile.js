const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const CustomerProfile = sequelize.define(
  "CustomerProfile",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    user_id: { type: DataTypes.CHAR(36), allowNull: false, unique: true },
    phone_number: { type: DataTypes.STRING(50), allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    loyalty_points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    tableName: "customer_profiles",
    timestamps: true,
  }
);

module.exports = CustomerProfile;
