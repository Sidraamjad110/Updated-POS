const { sequelize } = require("../models");

module.exports = async () => {
  await sequelize.authenticate();
  // Create / alter tables to match models (safe for first deploy on empty DB)
  await sequelize.sync({ alter: true });
  console.log(
    "MySQL connected:",
    `${process.env.DB_HOST || "localhost"}/${process.env.DB_NAME || "rasantsol_pos"}`
  );
};
