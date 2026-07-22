const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || "development"}`),
});

module.exports = {
  PLATFORM: process.env.PLATFORM || "Rasant Resturent",
  root: path.normalize(__dirname + "../app"),
  mongoUri:
    process.env.MONGOURI ||
    process.env.MONGODB_URI ||
    "mongodb+srv://resturentuser:pointofsale123@pointofsale.ck2n4ab.mongodb.net/resturentdb?retryWrites=true&w=majority",
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