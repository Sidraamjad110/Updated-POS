const userService = require("../services/userService");
const { handleResponse } = require("../helpers/resHelper");

const userController = {};

userController.createUser = async (req, res) => {
  const promise = userService.createUser(req.user, req.body);
  handleResponse(res, promise, "User created successfully");
};

userController.createAdmin = async (req, res) => {
  const promise = userService.createAdmin(req.body);
  handleResponse(res, promise, "Admin user created successfully");
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  const promise = userService.login(email, password);
  handleResponse(res, promise, "Login successful");
};

userController.getAllUsers = async (req, res) => {
  const promise = userService.getUsersByAdmin(req.user);
  handleResponse(res, promise, "");
};

userController.deleteUser = async (req, res) => {
  const promise = userService.deleteUser(req.user, req.body.id);
  handleResponse(res, promise, "User deleted successfully");
};

userController.assignRole = async (req, res) => {
  const { user_id, role_id } = req.body;
  const promise = userService.assignRoleToUser(req.user, user_id, role_id);
  handleResponse(res, promise, "Role assigned successfully");
};

userController.updateProfile = async (req, res) => {
  const promise = userService.updateUserProfile(req.user, req.body._id, req.body);
  handleResponse(res, promise, "Profile updated successfully");
};

userController.updateAdminProfile = async (req, res) => {
  const promise = userService.updateAdminProfile(req.user, req.body);
  handleResponse(res, promise, "Admin profile updated successfully");
};

userController.getUserDetails = async (req, res) => {
  const promise = userService.getUserDetails(req.user);
  handleResponse(res, promise, "User details retrieved successfully");
};

userController.updateUserStatus = async (req, res) => {
  const { user_id } = req.body;
  const promise = userService.updateUserStatus(req.user, user_id);
  handleResponse(res, promise, "User status updated successfully");
};

module.exports = userController;