const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.MYSQL_DATABASE || "rasantsol_pos",
  process.env.DB_USER || process.env.MYSQL_USER || "rasantsol_pos_user",
  process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || "uTbCZQqYyjd5",
  {
    host: process.env.DB_HOST || process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306),
    dialect: "mysql",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    define: {
      underscored: false,
      freezeTableName: true,
    },
    dialectOptions: {
      // cPanel / shared hosting often needs this
      connectTimeout: 60000,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
