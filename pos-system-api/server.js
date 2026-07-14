"use strict";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const CONFIG = require("./config");
const EXPRESS = require("express");
const app = EXPRESS();
app.set("port", CONFIG.server.PORT);
let startNodeServer = async () => {
  await require(`./app/startup/expressStartup`)(app);
  return new Promise((resolve, reject) => {
    app.listen(CONFIG.server.PORT, '0.0.0.0', (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
startNodeServer()
  .then(() => {
    console.log("Node server running on: ", CONFIG.server.URL);
    console.log("Swagger API docs available at: ", `${CONFIG.server.URL}/api-docs`);
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  })
  .catch((err) => {
    console.log("Error in starting server: ", err);
    process.exit(1);
  });
module.exports = app;