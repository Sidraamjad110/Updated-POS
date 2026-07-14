const createError = require("http-errors");
const Category = require("../models/Category");
const Product = require("../models/Product");

const categoryService = {};

// Create category
categoryService.createCategory = async (data) => {
  if (!data.name) throw createError(400, "Category name is required");
  if (!data.created_by) throw createError(400, "created_by is required");

  const existingCategory = await Category.findOne({
    name: data.name,
    created_by: data.created_by,
  });

  
  if (existingCategory) {
    throw createError(409, "Category with this name already exists");
  }

  return await Category.create(data);
};

// Get all categories
categoryService.getAllCategories = async (adminId) => {
  return await Category.find({ created_by: adminId });
};

// Update category by ID
categoryService.updateCategory = async (id, data, adminId) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: id, created_by: adminId },
    data,
    { new: true }
  );
  if (!updatedCategory) throw createError(404, "Category not found");
  return updatedCategory;
};

// Delete category by ID
categoryService.deleteCategory = async (id, adminId) => {
  const deletedCategory = await Category.findOneAndDelete({ _id: id, created_by: adminId });
  if (!deletedCategory) throw createError(404, "Category not found");

  // Delete all products associated with the category
  await Product.deleteMany({ category_id: id, created_by: adminId });
  return deletedCategory;
};

module.exports = categoryService;