const Joi = require("joi");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categoryController");
const { AVAILABLE_AUTHS } = require("../../utils/constants");

const apiPrefix = "/categories/api/v1/";
const { authHeader } = require("../../utils/utils");



const routes = [
  {
    method: "POST",
    path: `${apiPrefix}create`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        name: Joi.string().required().description("Category name").example("Beverages").default("Beverages"),
        description: Joi.string().optional().description("Category description").example("Drinks and refreshments").default("Drinks and refreshments"),
      }).description("Request body for creating a category"),
      group: "Category",
      description: "Create a new category",
      model: "CreateCategory",
    },
    handler: createCategory,
  },
  {
    method: "GET",
    path: `${apiPrefix}list`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "Category",
      description: "Get all categories",
      model: "GetAllCategories",
    },
    handler: getAllCategories,
  },
  {
    method: "PUT",
    path: `${apiPrefix}update`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        id: Joi.string().required().description("Category ID to update").example("cat123").default("cat123"),
        name: Joi.string().optional().description("Updated category name").example("Updated Beverages").default("Updated Beverages"),
        description: Joi.string().optional().description("Updated category description").example("Updated description").default("Updated description"),
      }).description("Request body for updating a category"),
      group: "Category",
      description: "Update a category",
      model: "UpdateCategory",
    },
    handler: updateCategory,
  },
  {
    method: "DELETE",
    path: `${apiPrefix}delete`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        id: Joi.string().required().description("Category ID to delete").example("cat123").default("cat123"),
      }).description("Request body for deleting a category"),
      group: "Category",
      description: "Delete a category",
      model: "DeleteCategory",
    },
    handler: deleteCategory,
  },
];

module.exports = routes;