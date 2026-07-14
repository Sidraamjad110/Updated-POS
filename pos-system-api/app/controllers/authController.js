const authService = require("../services/authService");
const { handleResponse } = require("../helpers/resHelper");

const authController = {};
// Handles user login and returns JWT token
authController.login = async (req, res, next) => {
  const { email, password } = req.body;
  const promise = authService.login(email, password);
  handleResponse(res, promise, "Login successful");
};

module.exports = authController;