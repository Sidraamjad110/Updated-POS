const productService = require("../services/productService");
const { handleResponse } = require("../helpers/resHelper");

const productController = {};

productController.createProduct = async (req, res, next) => {
  const promise = productService.createProductWithValidation(req.body, req.user);
  handleResponse(res, promise, "Product created");
};

productController.getAllProducts = async (req, res, next) => {
  const promise = productService.getAllProducts(req.user);
  handleResponse(res, promise, "");
};

productController.getProductsByCategory = async (req, res, next) => {
  const promise = productService.getProductsByCategory(req.body.category_id, req.user);
  handleResponse(res, promise, "");
};

productController.updateProduct = async (req, res, next) => {
  const promise = productService.updateProduct(req.body, req.user);
  handleResponse(res, promise, "Product updated");
};

productController.updateProductStatus = async (req, res, next) => {
  const promise = productService.updateProductStatus(req.body.id, req.body.status, req.user);
  handleResponse(res, promise, "Product status updated");
};

productController.deleteProduct = async (req, res, next) => {
  const promise = productService.deleteProduct(req.body.id, req.user);
  handleResponse(res, promise, "Product deleted");
};

productController.getDeactiveProducts = async (req, res, next) => {
  const promise = productService.getDeactiveProducts(req.user);
  handleResponse(res, promise, "");
};

module.exports = productController;