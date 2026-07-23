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

/** Ensure every new admin has the standard permission catalog in DB. */
permissionService.ensureDefaultPermissionsForAdmin = async (adminId) => {
  const { ALL_PERMISSION_KEYS } = require("../utils/permissionKeys");
  for (const key of ALL_PERMISSION_KEYS) {
    const exists = await Permission.findOne({ where: { key, created_by: adminId } });
    if (!exists) {
      await Permission.create({
        key,
        description: key.replace(/_/g, " "),
        created_by: adminId,
      });
    }
  }
  return true;
};

/**
 * Pages list shape expected by frontend AuthService.fetchMainPages:
 * [{ key, name, permissions: [{ key, ... }] }]
 */
permissionService.listPages = async (adminId) => {
  await permissionService.ensureDefaultPermissionsForAdmin(adminId);
  const permissions = await Permission.findAll({
    where: { created_by: adminId },
    order: [["key", "ASC"]],
  });
  const mapped = serialize(permissions).map((p) => ({
    _id: p._id || p.id,
    key: p.key,
    name: p.key,
    description: p.description || p.key,
  }));

  return [
    {
      _id: "all-pages",
      key: "all",
      name: "All Pages",
      description: "All application permissions",
      permissions: mapped,
    },
  ];
};

/** Permission keys for the logged-in user (admin = all; worker = role permissions). */
permissionService.getMyPermissionKeys = async (loggedInUser) => {
  const { ALL_PERMISSION_KEYS } = require("../utils/permissionKeys");
  const { Role, User } = require("../models");

  if (loggedInUser.user_type === "isadmin") {
    const adminId = loggedInUser.user_id;
    await permissionService.ensureDefaultPermissionsForAdmin(adminId);
    const permissions = await Permission.findAll({
      where: { created_by: adminId },
      attributes: ["key"],
    });
    const keys = permissions.map((p) => p.key);
    return keys.length ? keys : [...ALL_PERMISSION_KEYS];
  }

  const user = await User.findByPk(loggedInUser.user_id, {
    attributes: ["id", "role_id"],
  });
  if (!user?.role_id) return [];

  const role = await Role.findByPk(user.role_id, {
    include: [{ association: "permissions", attributes: ["key"] }],
  });
  if (!role) return [];
  return (role.permissions || []).map((p) => p.key);
};

module.exports = permissionService;
