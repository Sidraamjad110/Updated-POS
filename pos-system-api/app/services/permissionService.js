const createError = require("http-errors");
const Permission = require("../models/Permission");

const permissionService = {};

permissionService.createPermission = async (key, description, createdBy) => {
  if (!key) throw createError(400, "Permission key is required");
  if (!createdBy) throw createError(400, "created_by is required");

  const exists = await Permission.findOne({ key, created_by: createdBy });
  if (exists) throw createError(409, "Permission already exists");

  const permission = new Permission({ key, description, created_by: createdBy });
  await permission.save();
  return permission;
};

permissionService.deletePermission = async (permission_id, adminId) => {
  const deleted = await Permission.findOneAndDelete({ _id: permission_id, created_by: adminId });
  if (!deleted) throw createError(404, "Permission not found");
  return true;
};

permissionService.listPermissions = async (adminId) => {
  return await Permission.find({ created_by: adminId });
};

permissionService.updatePermissions = async (permission_id, key, description, adminId) => {
  const permission = await Permission.findOne({ _id: permission_id, created_by: adminId });
  if (!permission) throw createError(404, "Permission not found");

  if (key) {
    const exists = await Permission.findOne({ key, created_by: adminId, _id: { $ne: permission_id } });
    if (exists) throw createError(409, "Permission key already exists");
    permission.key = key;
  }

  if (description) permission.description = description;

  await permission.save();
  return permission;
};

permissionService.getPermissions = async (permission_id, adminId) => {
  const permission = await Permission.findOne({ _id: permission_id, created_by: adminId });
  if (!permission) throw createError(404, "Permission not found");
  return permission;
};

module.exports = permissionService;