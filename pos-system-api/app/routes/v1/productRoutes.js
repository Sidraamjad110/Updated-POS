const Joi = require("joi");
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  updateProductStatus,
  deleteProduct,
  getDeactiveProducts,
} = require("../../controllers/productController");
const { AVAILABLE_AUTHS } = require("../../utils/constants");
const { upload, uploadToCloudinary } = require("../../middleware/upload");
const { authHeader } = require("../../utils/utils");

const apiPrefix = "/products/api/v1/";

const routes = [
  // Create Product
  {
    method: "POST",
    path: `${apiPrefix}create`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    middleware: [
      (req, res, next) => {
        upload.single("picture")(req, res, next);
      },
      async (req, res, next) => {
        if (req.file) {
          try {
            req.body.pictureUrl = await uploadToCloudinary(req.file);
            next();
          } catch (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ error: "Failed to upload image" });
          }
        } else {
          console.log("No file uploaded");
          next();
        }
      },
    ],
    joiSchemaForSwagger: {
      headers: authHeader,
      formData: Joi.object({
        name: Joi.string().required().description("Product name").example("Coffee").default("Coffee"),
        description: Joi.string().required().description("Product description").example("Freshly brewed coffee").default("Freshly brewed coffee"),
        price: Joi.number().required().description("Product price").example(5.99).default(5.99),
        category_id: Joi.string().required().description("Associated category ID").example("cat123").default("cat123"),
        picture: Joi.any().optional().description("Product image file"),
        status: Joi.string().valid('active', 'deactive').optional().description("Product status").example("active").default("active"),
        time_required: Joi.number().min(0).required().description("Time required to prepare the product in minutes").example(5).default(5),
      }).description("Request body for creating a product"),
      consumes: ["multipart/form-data"],
      group: "Product",
      description: "Create a new product with optional image",
      model: "CreateProductWithImage",
    },
    handler: createProduct,
  },
  // Get All Products
  {
    method: "GET",
    path: `${apiPrefix}list`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "Product",
      description: "Get all products",
      model: "GetAllProducts",
    },
    handler: getAllProducts,
  },
  // Get Products by Category
  {
    method: "POST",
    path: `${apiPrefix}by-category`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        category_id: Joi.string().required().description("Category ID").example("cat123").default("cat123"),
      }).description("Request body for getting products by category"),
      group: "Product",
      description: "Get all products in a category",
      model: "GetProductsByCategory",
    },
    handler: getProductsByCategory,
  },
  // Update Product
  {
    method: "PUT",
    path: `${apiPrefix}update`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    middleware: [
      (req, res, next) => {
        upload.single("picture")(req, res, next);
      },
      async (req, res, next) => {
        if (req.file) {
          try {
            req.body.pictureUrl = await uploadToCloudinary(req.file);
            next();
          } catch (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ error: "Failed to upload image" });
          }
        } else {
          console.log("No file uploaded");
          next();
        }
      },
    ],
    joiSchemaForSwagger: {
      headers: authHeader,
      formData: Joi.object({
        id: Joi.string().required().description("Product ID to update").example("prod123").default("prod123"),
        name: Joi.string().optional().description("Updated product name").example("Updated Coffee").default("Updated Coffee"),
        description: Joi.string().optional().description("Updated product description").example("Updated coffee description").default("Updated coffee description"),
        price: Joi.number().optional().description("Updated product price").example(6.99).default(6.99),
        category_id: Joi.string().optional().description("Updated category ID").example("cat456").default("cat456"),
        picture: Joi.any().optional().description("Updated product image file"),
        status: Joi.string().valid('active', 'deactive').optional().description("Updated product status").example("active").default("active"),
        time_required: Joi.number().min(0).optional().description("Updated time required to prepare the product in minutes").example(5).default(5),
      }),
      consumes: ["multipart/form-data"],
      group: "Product",
      description: "Update a product (optionally with new image)",
      model: "UpdateProductWithImage",
    },
    handler: updateProduct,
  },
  // Update Product Status
  {
    method: "PATCH",
    path: `${apiPrefix}status`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        id: Joi.string().required().description("Product ID to update").example("prod123").default("prod123"),
        status: Joi.string().valid('active', 'deactive').required().description("Product status").example("active").default("active"),
      }).description("Request body for updating product status"),
      group: "Product",
      description: "Update product status",
      model: "UpdateProductStatus",
    },
    handler: updateProductStatus,
  },
  // Get Deactive Products
  {
    method: "GET",
    path: `${apiPrefix}deactive`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: "Product",
      description: "Get all deactivated products",
      model: "GetDeactiveProducts",
    },
    handler: getDeactiveProducts,
  },
  // Delete Product
  {
    method: "DELETE",
    path: `${apiPrefix}delete`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        id: Joi.string().required().description("Product ID to delete").example("prod123").default("prod123"),
      }).description("Request body for deleting a product"),
      group: "Product",
      description: "Delete a product",
      model: "DeleteProduct",
    },
    handler: deleteProduct,
  },
];

module.exports = routes;