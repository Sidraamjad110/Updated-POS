const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    pictureUrl: { type: DataTypes.STRING(500), allowNull: true },
    picture_data: { type: DataTypes.BLOB("long"), allowNull: true },
    picture_mime: { type: DataTypes.STRING(100), allowNull: true },
    category_id: { type: DataTypes.CHAR(36), allowNull: false },
    created_by: { type: DataTypes.CHAR(36), allowNull: false },
    status: {
      type: DataTypes.ENUM("active", "deactive"),
      allowNull: false,
      defaultValue: "active",
    },
    time_required: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    tableName: "products",
    timestamps: true,
    indexes: [{ unique: true, fields: ["name", "created_by"] }],
  }
);

module.exports = Product;
