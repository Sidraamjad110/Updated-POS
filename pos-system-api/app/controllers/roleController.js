const roleService = require("../services/roleService");
const { handleResponse } = require("../helpers/resHelper");
const { getAdminId } = require("../utils/utils");

const roleController = {};

roleController.createRole = async (req, res, next) => {
  const { name, description } = req.body;
  const createdBy = getAdminId(req);
  const promise = roleService.createRole(name, description, createdBy);
  handleResponse(res, promise, "Role created");
};




roleController.deleteRole = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = roleService.deleteRole(req.body.role_id, adminId);
  handleResponse(res, promise, "Role deleted successfully");
};

roleController.getRoles = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = roleService.getRoles(adminId);
  handleResponse(res, promise, "");
};

roleController.assignPermissionsToRole = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = roleService.assignPermissionsToRole(req.body.role_id, req.body.permission_ids, adminId);
  handleResponse(res, promise, "Permissions assigned to role");
};

roleController.updatePermissionsForRole = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = roleService.updatePermissionsForRole(
    req.body.role_id,
    req.body.add_permission_ids,
    req.body.remove_permission_ids,
    req.body.description,
    adminId
  );
  handleResponse(res, promise, "Role permissions updated successfully");
};

roleController.updateRole = async (req, res, next) => {
  const adminId = getAdminId(req);
  const { role_id, name, description } = req.body;
  const promise = roleService.updateRole(role_id, name, description, adminId);
  handleResponse(res, promise, "Role updated successfully");
};

module.exports = roleController;