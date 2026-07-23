const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_by: { type: DataTypes.CHAR(36), allowNull: false },
  },
  {
    tableName: "categories",
    timestamps: true,
    indexes: [{ unique: true, fields: ["name", "created_by"] }],
  }
);

module.exports = Category;
