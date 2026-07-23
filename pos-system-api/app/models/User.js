const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    user_type: {
      type: DataTypes.ENUM("isadmin", "worker", "customer"),
      allowNull: false,
    },
    role_id: { type: DataTypes.CHAR(36), allowNull: true },
    created_by: { type: DataTypes.CHAR(36), allowNull: true },
    /** Public URL to serve logo from DB (optional cache); bytes live in logo_data */
    logoUrl: { type: DataTypes.STRING(500), allowNull: true },
    logo_data: { type: DataTypes.BLOB("long"), allowNull: true },
    logo_mime: { type: DataTypes.STRING(100), allowNull: true },
    store_name: { type: DataTypes.STRING(255), allowNull: true },
    /** Public URL to serve store logo from DB; bytes live in store_logo_data */
    store_logo: { type: DataTypes.STRING(500), allowNull: true },
    store_logo_data: { type: DataTypes.BLOB("long"), allowNull: true },
    store_logo_mime: { type: DataTypes.STRING(100), allowNull: true },
    theme: { type: DataTypes.STRING(50), allowNull: true, defaultValue: "light" },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    currency: { type: DataTypes.STRING(20), allowNull: true, defaultValue: "pkr" },
    slug: { type: DataTypes.STRING(255), allowNull: true },
    phone_number: { type: DataTypes.STRING(50), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
