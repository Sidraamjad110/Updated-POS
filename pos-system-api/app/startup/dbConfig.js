const mongoose = require("mongoose");
mongoose.Promise = require("bluebird"); //Bluebird is a fully featured promise library with focus on innovative features and performance

const CONFIG = require("../../config");

module.exports = async () => {
  const options = {
    // useNewUrlParser: true,
  };
  await mongoose.connect(CONFIG.mongoUri, options);
  console.log("MongoDB connect at: ", CONFIG.mongoUri);
};
