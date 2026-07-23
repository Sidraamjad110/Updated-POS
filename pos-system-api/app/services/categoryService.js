const createError = require("http-errors");
const { Category, Product } = require("../models");
const { serialize, isValidId } = require("../utils/serialize");

const categoryService = {};

categoryService.createCategory = async (data) => {
  if (!data.name) throw createError(400, "Category name is required");
  if (!data.created_by) throw createError(400, "created_by is required");

  const existingCategory = await Category.findOne({
    where: { name: data.name, created_by: data.created_by },
  });

  if (existingCategory) {
    throw createError(409, "Category with this name already exists");
  }

  const category = await Category.create(data);
  return serialize(category);
};

categoryService.getAllCategories = async (adminId) => {
  const categories = await Category.findAll({ where: { created_by: adminId } });
  return serialize(categories);
};

categoryService.updateCategory = async (id, data, adminId) => {
  if (!isValidId(id)) throw createError(400, "Invalid category ID");

  const category = await Category.findOne({ where: { id, created_by: adminId } });
  if (!category) throw createError(404, "Category not found");

  await category.update(data);
  return serialize(category);
};

categoryService.deleteCategory = async (id, adminId) => {
  if (!isValidId(id)) throw createError(400, "Invalid category ID");

  const category = await Category.findOne({ where: { id, created_by: adminId } });
  if (!category) throw createError(404, "Category not found");

  await Product.destroy({ where: { category_id: id, created_by: adminId } });
  await category.destroy();
  return serialize(category);
};

module.exports = categoryService;
