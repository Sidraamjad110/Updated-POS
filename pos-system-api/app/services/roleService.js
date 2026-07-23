const createError = require("http-errors");
const { Op } = require("sequelize");
const { Role, Permission } = require("../models");
const { serialize, isValidId } = require("../utils/serialize");

const roleService = {};

async function loadRoleWithPermissions(role) {
  const permissions = await role.getPermissions({ attributes: ["id", "key", "description"] });
  const data = serialize(role);
  data.permissions = serialize(permissions);
  return data;
}

roleService.createRole = async (name, description, createdBy) => {
  if (!name) throw createError(400, "Role name is required");
  if (!createdBy) throw createError(400, "created_by is required");

  const exists = await Role.findOne({ where: { name, created_by: createdBy } });
  if (exists) throw createError(409, "Role already exists");

  const role = await Role.create({ name, description, created_by: createdBy });
  const data = serialize(role);
  data.permissions = [];
  return data;
};

roleService.deleteRole = async (role_id, adminId) => {
  if (!isValidId(role_id)) throw createError(400, "Invalid role ID");

  const role = await Role.findOne({ where: { id: role_id, created_by: adminId } });
  if (!role) throw createError(404, "Role not found");

  await role.setPermissions([]);
  await role.destroy();
  return true;
};

roleService.getRoles = async (adminId) => {
  const roles = await Role.findAll({
    where: { created_by: adminId },
    include: [{ model: Permission, as: "permissions", attributes: ["id", "key", "description"] }],
  });
  return serialize(roles);
};

roleService.assignPermissionsToRole = async (role_id, permission_ids, adminId) => {
  if (!role_id || !Array.isArray(permission_ids)) {
    throw createError(400, "role_id and permission_ids are required");
  }

  const role = await Role.findOne({ where: { id: role_id, created_by: adminId } });
  if (!role) throw createError(404, "Role not found");

  const validIds = permission_ids.filter((id) => isValidId(id));
  const existingPermissions = await Permission.findAll({
    where: { id: { [Op.in]: validIds }, created_by: adminId },
    attributes: ["id"],
  });

  const validPermissionIds = existingPermissions.map((p) => p.id);
  const invalidPermissionIds = permission_ids.filter((id) => !validPermissionIds.includes(id));

  const currentPermissions = await role.getPermissions({ attributes: ["id"] });
  const currentPermissionIds = new Set(currentPermissions.map((p) => p.id));
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

  if (newPermissions.length > 0) {
    await role.addPermissions(newPermissions);
  }

  const roleData = await loadRoleWithPermissions(role);
  return { role: roleData, ignored_invalid_permission_ids: invalidPermissionIds };
};

roleService.updatePermissionsForRole = async (role_id, addIds = [], removeIds = [], description, adminId) => {
  if (!role_id) throw createError(400, "role_id is required");

  const role = await Role.findOne({ where: { id: role_id, created_by: adminId } });
  if (!role) throw createError(404, "Role not found");

  const currentPermissions = await role.getPermissions({ attributes: ["id"] });
  const currentPermissionIds = currentPermissions.map((p) => p.id);

  const validExisting = await Permission.findAll({
    where: { id: { [Op.in]: currentPermissionIds }, created_by: adminId },
    attributes: ["id"],
  });
  const validExistingPermissionIds = new Set(validExisting.map((p) => p.id));

  const updatedPermissions = new Set(
    currentPermissionIds.filter((id) => validExistingPermissionIds.has(id))
  );

  const allPermissionIds = [...new Set([...addIds, ...removeIds])];
  const validInputIds = allPermissionIds.filter((id) => isValidId(id));

  const newPermissions = await Permission.findAll({
    where: { id: { [Op.in]: validInputIds }, created_by: adminId },
    attributes: ["id"],
  });

  const validIds = newPermissions.map((p) => p.id);
  const invalidIds = allPermissionIds.filter((id) => !validIds.includes(id));

  addIds.filter((id) => validIds.includes(id)).forEach((id) => updatedPermissions.add(id));
  removeIds.filter((id) => validIds.includes(id)).forEach((id) => updatedPermissions.delete(id));

  await role.setPermissions(Array.from(updatedPermissions));

  if (description !== undefined) {
    role.description = description;
    await role.save();
  }

  const roleData = await loadRoleWithPermissions(role);
  return { role: roleData, removed_invalid_permission_ids: invalidIds };
};

roleService.updateRole = async (role_id, name, description, adminId) => {
  if (!role_id) throw createError(400, "role_id is required");

  const role = await Role.findOne({ where: { id: role_id, created_by: adminId } });
  if (!role) throw createError(404, "Role not found");

  if (name) {
    const exists = await Role.findOne({
      where: { name, created_by: adminId, id: { [Op.ne]: role_id } },
    });
    if (exists) throw createError(409, "Role name already exists");
    role.name = name;
  }

  if (description !== undefined) role.description = description;

  await role.save();
  return serialize(role);
};

module.exports = roleService;
