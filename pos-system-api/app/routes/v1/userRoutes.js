const Joi = require("joi");
const { createUser, getAllUsers, login, deleteUser, createAdmin, assignRole, updateProfile, updateAdminProfile, getUserDetails, updateUserStatus, getLogoImage, getStoreLogoImage, getPublicStore } = require("../../controllers/userController");
const { AVAILABLE_AUTHS } = require("../../utils/constants");
const { authHeader, userinfo, ouserinfo } = require("../../utils/utils");
const { upload, attachAdminLogoBytes } = require("../../middleware/upload");

const apiPrefix = "/users/api/v1/";

const address = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required(),
  country: Joi.string().default('USA')
});

let routes = [
  {
    method: "GET",
    path: `${apiPrefix}logo/:id`,
    joiSchemaForSwagger: {
      group: "Users",
      description: "Get admin logo image bytes from the database",
      model: "GetUserLogo",
    },
    handler: getLogoImage,
  },
  {
    method: "GET",
    path: `${apiPrefix}store-logo/:id`,
    joiSchemaForSwagger: {
      group: "Users",
      description: "Get store logo image bytes from the database",
      model: "GetStoreLogo",
    },
    handler: getStoreLogoImage,
  },
  {
    method: "GET",
    path: `${apiPrefix}public/store/:slug`,
    joiSchemaForSwagger: {
      group: "Users",
      description: "Public store details by slug",
      model: "GetPublicStore",
    },
    handler: getPublicStore,
  },
  {
    method: "POST",
    path: `${apiPrefix}create`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        ...userinfo,
        user_type: Joi.string().valid("worker", "customer").required().description("User type").example("worker").default("worker"),
        role_id: Joi.string().optional().description("Role ID").example("role123").default("role123"),
        phone_number: Joi.string().optional().description("Phone number").example("1234567890").default("1234567890"),
        address: Joi.string().optional().description("Address").example("123 Main St").default("123 Main St"),
        job_title: Joi.string().optional().description("Job title").example("Waiter").default("Waiter"),
        shift_time: Joi.string().optional().description("Shift time").example("9am-5pm").default("9am-5pm"),
        salary: Joi.number().optional().description("Salary").example(25000).default(25000),
      }),
      group: "Users",
      description: "Create a new user",
      model: "CreateUser",
    },
    handler: createUser,
  },
  {
    method: "POST",
    path: `${apiPrefix}create-admin`,
    auth: AVAILABLE_AUTHS.NO_AUTH,
    middleware: [
      (req, res, next) => {
        upload.fields([
          { name: "logo", maxCount: 1 },
          { name: "store_logo", maxCount: 1 },
        ])(req, res, (err) => {
          if (err) {
            console.error("Multer error on create-admin:", err.message || err);
            return res.status(400).json({
              statusCode: 400,
              message: err.message || "Invalid image upload",
              success: false,
              error: "BAD_REQUEST",
              type: 0,
            });
          }
          next();
        });
      },
      attachAdminLogoBytes,
    ],
    joiSchemaForSwagger: {
      headers: Joi.object({}).unknown(),
      formData: Joi.object({
        ...userinfo,
        logo: Joi.any().optional().description("Admin logo image file"),
        store_logo: Joi.any().optional().description("Store logo image file"),
        store_name: Joi.string().required().description("Store name").example("My Store").default("My Store"),
        theme: Joi.string().valid("light", "dark", "blue", "green").optional().description("Theme").example("light").default("light"),
      }).description("Request body for creating an admin"),
      consumes: ["multipart/form-data"],
      group: "Users",
      description: "Create an admin user with optional logo, store logo, store name, and theme",
      model: "CreateAdmin",
    },
    handler: createAdmin,
  },
  {
    method: "POST",
    path: `${apiPrefix}login`,
    auth: AVAILABLE_AUTHS.NO_AUTH,
    joiSchemaForSwagger: {
      headers: Joi.object({}).unknown(),
      body: Joi.object({
        email: Joi.string().email().required().description("User email"),
        password: Joi.string().required().description("User password"),
      }),
      group: "Users",
      description: "User login",
      model: "LoginUser",
    },
    handler: login,
  },
  {
    method: "GET",
    path: `${apiPrefix}list`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "Users",
      description: "Get all users",
      model: "GetAllUsers",
    },
    handler: getAllUsers,
  },
  {
    method: "DELETE",
    path: `${apiPrefix}delete`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        id: Joi.string().required().description("User ID to delete").example("userId123").default("userId123"),
      }),
      group: "Users",
      description: "Delete a user by ID (cannot delete admin users)",
      model: "DeleteUser",
    },
    handler: deleteUser,
  },
  {
    method: "POST",
    path: `${apiPrefix}assign-role`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        user_id: Joi.string().required().description("User ID").example("user123").default("user123"),
        role_id: Joi.string().required().description("Role ID").example("role123").default("role123"),
      }),
      group: "Users",
      description: "Assign a role to a user",
      model: "AssignRole",
    },
    handler: assignRole,
  },
  {
    method: "PUT",
    path: `${apiPrefix}profile`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        ...ouserinfo,
        _id: Joi.string().required().description("ID of the user to update").example("userId123").default("userId123"),
        phone_number: Joi.string().optional().description("Updated phone number").example("9876543210").default("9876543210"),
        job_title: Joi.string().optional().description("Updated job title").example("Manager").default("Manager"),
        shift_time: Joi.string().optional().description("Shift time for workers").example("10am-6pm").default("10am-6pm"),
        salary: Joi.number().optional().description("Salary for workers").example(30000).default(30000),
      }),
      group: "Users",
      description: "Update user profile by admin who created the user (name, email, password, shift time, salary)",
      model: "UpdateProfile",
    },
    handler: updateProfile,
  },
  {
    method: "PUT",
    path: `${apiPrefix}admin-profile`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    middleware: [
      (req, res, next) => {
        upload.fields([
          { name: "logo", maxCount: 1 },
          { name: "store_logo", maxCount: 1 },
        ])(req, res, (err) => {
          if (err) {
            console.error("Multer error on admin-profile:", err.message || err);
            return res.status(400).json({
              statusCode: 400,
              message: err.message || "Invalid image upload",
              success: false,
              error: "BAD_REQUEST",
              type: 0,
            });
          }
          next();
        });
      },
      attachAdminLogoBytes,
    ],
    joiSchemaForSwagger: {
      headers: authHeader,
      formData: Joi.object({
        ...ouserinfo,
        logo: Joi.any().optional().description("Updated admin logo image file"),
        store_logo: Joi.any().optional().description("Updated store logo image file"),
        store_name: Joi.string().optional().description("Updated store name").example("Updated Store").default("Updated Store"),
        theme: Joi.string().valid("light", "dark", "blue", "green").optional().description("Updated theme").example("light").default("light"),
      }).description("Request body for updating admin profile"),
      consumes: ["multipart/form-data"],
      group: "Users",
      description: "Update admin profile (name, email, password, logo, store logo, store name, theme)",
      model: "UpdateAdminProfile",
    },
    handler: updateAdminProfile,
  },
  {
    method: "GET",
    path: `${apiPrefix}details`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "Users",
      description: "Get user or admin details from token",
      model: "GetUserDetails",
    },
    handler: getUserDetails,
  },
  {
    method: "PUT",
    path: `${apiPrefix}status`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        user_id: Joi.string().required().description("User ID to update status").example("user123").default("user123"),
      }),
      group: "Users",
      description: "Update user status to 0 (inactive) by admin",
      model: "UpdateUserStatus",
    },
    handler: updateUserStatus,
  },
];

module.exports = routes;