const createError = require("http-errors");
const { Op } = require("sequelize");
const { Permission } = require("../models");
const { serialize, isValidId } = require("../utils/serialize");

const permissionService = {};

permissionService.createPermission = async (key, description, createdBy) => {
  if (!key) throw createError(400, "Permission key is required");
  if (!createdBy) throw createError(400, "created_by is required");

  const exists = await Permission.findOne({ where: { key, created_by: createdBy } });
  if (exists) throw createError(409, "Permission already exists");

  const permission = await Permission.create({ key, description, created_by: createdBy });
  return serialize(permission);
};

permissionService.deletePermission = async (permission_id, adminId) => {
  if (!isValidId(permission_id)) throw createError(400, "Invalid permission ID");

  const deleted = await Permission.destroy({
    where: { id: permission_id, created_by: adminId },
  });
  if (!deleted) throw createError(404, "Permission not found");
  return true;
};

permissionService.listPermissions = async (adminId) => {
  const permissions = await Permission.findAll({ where: { created_by: adminId } });
  return serialize(permissions);
};

permissionService.updatePermissions = async (permission_id, key, description, adminId) => {
  if (!isValidId(permission_id)) throw createError(400, "Invalid permission ID");

  const permission = await Permission.findOne({
    where: { id: permission_id, created_by: adminId },
  });
  if (!permission) throw createError(404, "Permission not found");

  if (key) {
    const exists = await Permission.findOne({
      where: { key, created_by: adminId, id: { [Op.ne]: permission_id } },
    });
    if (exists) throw createError(409, "Permission key already exists");
    permission.key = key;
  }

  if (description) permission.description = description;

  await permission.save();
  return serialize(permission);
};

permissionService.getPermissions = async (permission_id, adminId) => {
  if (!isValidId(permission_id)) throw createError(400, "Invalid permission ID");

  const permission = await Permission.findOne({
    where: { id: permission_id, created_by: adminId },
  });
  if (!permission) throw createError(404, "Permission not found");
  return serialize(permission);
};

module.exports = permissionService;
