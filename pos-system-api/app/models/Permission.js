const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    key: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_by: { type: DataTypes.CHAR(36), allowNull: false },
  },
  {
    tableName: "permissions",
    timestamps: true,
    indexes: [{ unique: true, fields: ["key", "created_by"] }],
  }
);

module.exports = Permission;
