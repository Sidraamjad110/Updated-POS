const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db/sequelize");

const WorkerProfile = sequelize.define(
  "WorkerProfile",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    user_id: { type: DataTypes.CHAR(36), allowNull: false, unique: true },
    job_title: { type: DataTypes.STRING(255), allowNull: true },
    shift_time: { type: DataTypes.STRING(255), allowNull: true },
    salary: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
  },
  {
    tableName: "worker_profiles",
    timestamps: true,
  }
);

module.exports = WorkerProfile;
