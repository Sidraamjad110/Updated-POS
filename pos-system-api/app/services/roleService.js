const createError = require("http-errors");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const mongoose = require("mongoose");

const roleService = {};

roleService.createRole = async (name, description, createdBy) => {
  if (!name) throw createError(400, "Role name is required");
  if (!createdBy) throw createError(400, "created_by is required");

  const exists = await Role.findOne({ name, created_by: createdBy });
  if (exists) throw createError(409, "Role already exists");

  const role = new Role({ name, description, permissions: [], created_by: createdBy });
  await role.save();
  return role;
};

roleService.deleteRole = async (role_id, adminId) => {
  const deleted = await Role.findOneAndDelete({ _id: role_id, created_by: adminId });
  if (!deleted) throw createError(404, "Role not found");
  return true;
};

roleService.getRoles = async (adminId) => {
  return await Role.find({ created_by: adminId }).populate("permissions", "key description");
};

roleService.assignPermissionsToRole = async (role_id, permission_ids, adminId) => {
  if (!role_id || !Array.isArray(permission_ids)) {
    throw createError(400, "role_id and permission_ids are required");
  }

  const role = await Role.findOne({ _id: role_id, created_by: adminId });
  if (!role) throw createError(404, "Role not found");

  const existingPermissions = await Permission.find({
    _id: { $in: permission_ids },
    created_by: adminId,
  }).select("_id");

  const validPermissionIds = existingPermissions.map(p => p._id.toString());
  const invalidPermissionIds = permission_ids.filter(id => !validPermissionIds.includes(id));

  const currentPermissionIds = new Set(role.permissions.map(id => id.toString()));
  const alreadyAssigned = [];
  const newPermissions = [];

  for (const id of validPermissionIds) {
    if (currentPermissionIds.has(id)) {
      alreadyAssigned.push(id);
    } else {
      newPermissions.push(id);
    }
  }

  if (alreadyAssigned.length > 0) {
    throw createError(400, `Permissions already assigned: ${alreadyAssigned.join(", ")}`);
  }

  role.permissions.push(...newPermissions);
  await role.save();

  return { role, ignored_invalid_permission_ids: invalidPermissionIds };
};

roleService.updatePermissionsForRole = async (role_id, addIds = [], removeIds = [], description, adminId) => {
  if (!role_id) throw createError(400, "role_id is required");

  const role = await Role.findOne({ _id: role_id, created_by: adminId });
  if (!role) throw createError(404, "Role not found");

  const currentPermissionIds = role.permissions.map(id => id.toString());
  const existingPermissions = await Permission.find({
    _id: { $in: currentPermissionIds },
    created_by: adminId,
  }).select("_id");

  const validExistingPermissionIds = new Set(existingPermissions.map(p => p._id.toString()));
  role.permissions = role.permissions.filter(id => validExistingPermissionIds.has(id.toString()));

  const allPermissionIds = [...new Set([...addIds, ...removeIds])];
  const validObjectIds = allPermissionIds.filter(id => mongoose.Types.ObjectId.isValid(id));

  const newPermissions = await Permission.find({
    _id: { $in: validObjectIds },
    created_by: adminId,
  }).select("_id");

  const validIds = newPermissions.map(p => p._id.toString());
  const invalidIds = allPermissionIds.filter(id => !validIds.includes(id));

  const updatedPermissions = new Set(role.permissions.map(id => id.toString()));

  addIds.filter(id => validIds.includes(id)).forEach(id => updatedPermissions.add(id));
  removeIds.filter(id => validIds.includes(id)).forEach(id => updatedPermissions.delete(id));

  role.permissions = Array.from(updatedPermissions);
  if (description !== undefined) role.description = description;

  await role.save();

  return { role, removed_invalid_permission_ids: invalidIds };
};

roleService.updateRole = async (role_id, name, description, adminId) => {
  if (!role_id) throw createError(400, "role_id is required");

  const role = await Role.findOne({ _id: role_id, created_by: adminId });
  if (!role) throw createError(404, "Role not found");

  if (name) {
    const exists = await Role.findOne({ name, created_by: adminId, _id: { $ne: role_id } });
    if (exists) throw createError(409, "Role name already exists");
    role.name = name;
  }

  if (description !== undefined) role.description = description;

  await role.save();
  return role;
};

module.exports = roleService;