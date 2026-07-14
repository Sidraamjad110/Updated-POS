const Joi = require("joi");
const {
  createRole,
  getRoles,
  assignPermissionsToRole,
  updatePermissionsForRole,
  deleteRole,
  updateRole,
} = require("../../controllers/roleController");

const {
  createPermission,
  listPermissions,
  deletePermission,
  updatePermissions,
  getPermissions,
} = require("../../controllers/permissionController");
const { AVAILABLE_AUTHS } = require("../../utils/constants");

const apiPrefix = "/rolepermission/api/v1/";

const { authHeader } = require("../../utils/utils");

const routes = [
  // Create Role
  {
    method: "POST",
    path: `${apiPrefix}roles/create`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        name: Joi.string().required().description("Role name"),
        description: Joi.string().optional().description("Role description"),
      }),
      group: "RolePermission",
      description: "Create a new role",
      model: "CreateRole",
    },
    handler: createRole,
  },

  {
  method: "POST",
  path: `${apiPrefix}permissions/get`,
  auth: AVAILABLE_AUTHS.AUTH_TOKEN,
  joiSchemaForSwagger: {
    headers: authHeader,
    body: Joi.object({
      permission_id: Joi.string().required().description("Permission ID to retrieve"),
    }),
    group: "RolePermission",
    description: "Get a permission by ID",
    model: "GetPermission",
  },
  handler: getPermissions,
},

  // Delete Role
  {
    method: "DELETE",
    path: `${apiPrefix}roles/delete`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        role_id: Joi.string().required().description("Role ID to delete"),
      }),
      group: "RolePermission",
      description: "Delete a role by ID",
      model: "DeleteRole",
    },
    handler: deleteRole,
  },

  // Get Roles
  {
    method: "GET",
    path: `${apiPrefix}roles/list`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "RolePermission",
      description: "Get all roles",
      model: "GetRoles",
    },
    handler: getRoles,
  },

  // Assign Permissions to Role
  {
    method: "POST",
    path: `${apiPrefix}roles/assign-permissions`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        role_id: Joi.string().required().description("Role ID to assign permissions"),
        permission_ids: Joi.array().items(Joi.string()).required().description("Array of permission IDs to assign"),
      }),
      group: "RolePermission",
      description: "Assign permissions to a role",
      model: "AssignPermissions",
    },
    handler: assignPermissionsToRole,
  },

  // Update Role Permissions
  {
    method: "PUT",
    path: `${apiPrefix}roles/update-permissions`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        role_id: Joi.string().required().description("Role ID to update permissions"),
        add_permission_ids: Joi.array().items(Joi.string()).optional().description("Permission IDs to add"),
        remove_permission_ids: Joi.array().items(Joi.string()).optional().description("Permission IDs to remove"),
        description: Joi.string().optional().description("Updated role description"),
      }).or("add_permission_ids", "remove_permission_ids", "description"),
      group: "RolePermission",
      description: "Add or remove permissions for a role without replacing all",
      model: "UpdateRolePermissions",
    },
    handler: updatePermissionsForRole,
  },

  // Update Role
  {
    method: "PUT",
    path: `${apiPrefix}roles/update`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        role_id: Joi.string().required().description("Role ID to update"),
        name: Joi.string().optional().description("Updated role name"),
        description: Joi.string().optional().description("Updated role description"),
      }).or("name", "description"),
      group: "RolePermission",
      description: "Update a role's name or description",
      model: "UpdateRole",
    },
    handler: updateRole,
  },

  // Create Permission
  {
    method: "POST",
    path: `${apiPrefix}permissions/create`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        key: Joi.string().required().description("Permission key"),
        description: Joi.string().optional().description("Permission description"),
      }),
      group: "RolePermission",
      description: "Create a new permission",
      model: "CreatePermission",
    },
    handler: createPermission,
  },

  // Delete Permission
  {
    method: "DELETE",
    path: `${apiPrefix}permissions/delete`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        permission_id: Joi.string().required().description("Permission ID to delete"),
      }),
      group: "RolePermission",
      description: "Delete a permission by ID",
      model: "DeletePermission",
    },
    handler: deletePermission,
  },

  // List Permissions
  {
    method: "GET",
    path: `${apiPrefix}permissions/list`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "RolePermission",
      description: "List all permissions",
      model: "ListPermissions",
    },
    handler: listPermissions,
  },

  // Update Permission
  {
    method: "PUT",
    path: `${apiPrefix}permissions/update`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        permission_id: Joi.string().required().description("Permission ID to update"),
        key: Joi.string().optional().description("Updated permission key"),
        description: Joi.string().optional().description("Updated permission description"),
      }),
      group: "RolePermission",
      description: "Update a permission",
      model: "UpdatePermission",
    },
    handler: updatePermissions,
  },

  
];

module.exports = routes;
