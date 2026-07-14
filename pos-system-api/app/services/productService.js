const createError = require("http-errors");
const Product = require("../models/Product");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const { getAdminId } = require("../utils/utils");

const productService = {};

productService.createProductWithValidation = async (productData, user) => {
  const adminId = getAdminId(user);

  if (!productData.name) throw createError(400, "Product name is required");
  if (!productData.time_required || productData.time_required < 0) throw createError(400, "Valid time required is necessary");
  const category = await Category.findOne({ _id: productData.category_id, created_by: adminId });
  if (!category) throw createError(400, "Invalid category");

  const product = new Product({
    ...productData,
    created_by: adminId,
    pictureUrl: productData.pictureUrl || null,
    time_required: productData.time_required,
  });

  try {
    await product.save();
    return product;
  } catch (err) {
    if (err.code === 11000) {
      throw createError(409, "Product name already exists");
    }
    throw createError(500, "Failed to create product", { details: err.message });
  }
};

productService.getAllProducts = async (user) => {
  const adminId = getAdminId(user);
  return Product.find({ created_by: adminId }).populate("category_id");
};

productService.getProductsByCategory = async (categoryId, user) => {
  const adminId = getAdminId(user);
  const category = await Category.findOne({ _id: categoryId, created_by: adminId });
  if (!category) throw createError(404, "Category not found");
  return Product.find({ category_id: categoryId, created_by: adminId }).populate("category_id");
};

productService.getDeactiveProducts = async (user) => {
  const adminId = getAdminId(user);
  return Product.find({ created_by: adminId, status: 'deactive' }).populate("category_id");
};

productService.updateProduct = async (updateData, user) => {
  const adminId = getAdminId(user);
  const productObjectId = new mongoose.Types.ObjectId(updateData.id);

  const existingProduct = await Product.findOne({ _id: productObjectId, created_by: adminId });
  if (!existingProduct) throw createError(404, "Product not found or unauthorized");

  if (updateData.category_id) {
    const category = await Category.findOne({ _id: updateData.category_id, created_by: adminId });
    if (!category) throw createError(400, "Invalid category");
  }

  const updateFields = {
    name: updateData.name || existingProduct.name,
    description: updateData.description || existingProduct.description,
    price: updateData.price || existingProduct.price,
    category_id: updateData.category_id || existingProduct.category_id,
    pictureUrl: updateData.pictureUrl || existingProduct.pictureUrl,
    status: updateData.status || existingProduct.status,
    time_required: updateData.time_required !== undefined ? updateData.time_required : existingProduct.time_required,
  };

  return Product.findByIdAndUpdate(productObjectId, updateFields, { new: true });
};

productService.updateProductStatus = async (productId, status, user) => {
  const adminId = getAdminId(user);
  const productObjectId = new mongoose.Types.ObjectId(productId);

  const existingProduct = await Product.findOne({ _id: productObjectId, created_by: adminId });
  if (!existingProduct) throw createError(404, "Product not found or unauthorized");

  if (!['active', 'deactive'].includes(status)) {
    throw createError(400, "Invalid status. Must be 'active' or 'deactive'");
  }

  return Product.findByIdAndUpdate(
    productObjectId,
    { status },
    { new: true }
  );
};

productService.deleteProduct = async (productId, user) => {
  const adminId = getAdminId(user);
  const product = await Product.findOne({ _id: productId, created_by: adminId });
  if (!product) throw createError(404, "Product not found or unauthorized");
  await Product.findByIdAndDelete(productId);
  return true;
};

module.exports = productService;