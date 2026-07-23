const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    role_id: { type: DataTypes.CHAR(36), allowNull: false },
    permission_id: { type: DataTypes.CHAR(36), allowNull: false },
  },
  {
    tableName: "role_permissions",
    timestamps: false,
    indexes: [{ unique: true, fields: ["role_id", "permission_id"] }],
  }
);

module.exports = RolePermission;
