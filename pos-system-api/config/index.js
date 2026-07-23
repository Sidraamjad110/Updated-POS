const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || "development"}`),
});

module.exports = {
  PLATFORM: process.env.PLATFORM || "Rasant Resturent",
  root: path.normalize(__dirname + "../app"),
  // Kept for backwards compatibility; DB is now MySQL via Sequelize
  mongoUri: process.env.MONGOURI || process.env.MONGODB_URI || null,
  db: {
    host: process.env.DB_HOST || process.env.MYSQL_HOST || "localhost",
    port: process.env.DB_PORT || process.env.MYSQL_PORT || "3306",
    name: process.env.DB_NAME || process.env.MYSQL_DATABASE || "rasantsol_pos",
    user: process.env.DB_USER || process.env.MYSQL_USER || "rasantsol_pos_user",
    password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || "uTbCZQqYyjd5",
  },
  serverUrl:
    process.env.PUBLIC_URL ||
    process.env.SERVER_URL ||
    "http://192.168.18.107:3000",
  environment: process.env.NODE_ENV || "development",
  server: {
    PROTOCOL: process.env.SERVER_PROTOCOL || "http",
    HOST: process.env.SERVER_HOST || "192.168.18.107",
    PORT: process.env.PORT || process.env.SERVER_PORT || "3000",
    NODE_ENV: process.env.NODE_ENV || "development",
    get URL() {
      return (
        process.env.PUBLIC_URL ||
        process.env.SERVER_URL ||
        `${this.PROTOCOL}://${this.HOST}:${this.PORT}`
      );
    },
  },
  swagger: require("../app/swagger"),
};
