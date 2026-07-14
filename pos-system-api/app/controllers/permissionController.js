const permissionService = require("../services/permissionService");
const { handleResponse } = require("../helpers/resHelper");
const { getAdminId } = require("../utils/utils");

const permissionController = {};

permissionController.createPermission = async (req, res, next) => {
  const { key, description } = req.body;
  const createdBy = getAdminId(req);
  const promise = permissionService.createPermission(key, description, createdBy);
  handleResponse(res, promise, "Permission created");
};

permissionController.deletePermission = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = permissionService.deletePermission(req.body.permission_id, adminId);
  handleResponse(res, promise, "Permission deleted successfully");
};

permissionController.listPermissions = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = permissionService.listPermissions(adminId);
  handleResponse(res, promise, "");
};

permissionController.updatePermissions = async (req, res, next) => {
  const adminId = getAdminId(req);
  const { permission_id, key, description } = req.body;
  const promise = permissionService.updatePermissions(permission_id, key, description, adminId);
  handleResponse(res, promise, "Permission updated successfully");
};

permissionController.getPermissions = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = permissionService.getPermissions(req.params.permission_id, adminId);
  handleResponse(res, promise, "");
};

module.exports = permissionController;