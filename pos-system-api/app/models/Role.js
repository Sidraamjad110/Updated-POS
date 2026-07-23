const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const Role = sequelize.define(
  "Role",
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
    tableName: "roles",
    timestamps: false,
    indexes: [{ unique: true, fields: ["name", "created_by"] }],
  }
);

module.exports = Role;
