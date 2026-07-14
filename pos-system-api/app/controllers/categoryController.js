const categoryService = require("../services/categoryService");
const { handleResponse } = require("../helpers/resHelper");
const { getAdminId } = require("../utils/utils");

const categoryController = {};

// Create category
categoryController.createCategory = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = categoryService.createCategory({
    ...req.body,
    created_by: adminId,
  });
  handleResponse(res, promise, "Category created");
};

// Get all categories
categoryController.getAllCategories = async (req, res, next) => {
  const adminId = getAdminId(req);
  const promise = categoryService.getAllCategories(adminId);
  handleResponse(res, promise, "");
};

// Update category
categoryController.updateCategory = async (req, res, next) => {
  const adminId = getAdminId(req);
  const { id, ...updateData } = req.body;
  const promise = categoryService.updateCategory(id, updateData, adminId);
  handleResponse(res, promise, "Category updated");
};

// Delete category
categoryController.deleteCategory = async (req, res, next) => {
  const adminId = getAdminId(req);
  const { id } = req.body;
  const promise = categoryService.deleteCategory(id, adminId);
  handleResponse(res, promise, "Category deleted");
};

module.exports = categoryController;