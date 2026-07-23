const createError = require("http-errors");
const { Product, Category } = require("../models");
const { getAdminId } = require("../utils/utils");
const { serialize, isValidId } = require("../utils/serialize");

const productService = {};

const PRODUCT_LIST_ATTRS = {
  exclude: ["picture_data"],
};

function imageUrlFor(productId) {
  const base = (process.env.PUBLIC_URL || process.env.SERVER_URL || "").replace(/\/$/, "");
  const path = `/products/api/v1/image/${productId}`;
  return base ? `${base}${path}` : path;
}

function mapProduct(product) {
  const data = serialize(product);
  if (data.category) data.category_id = data.category;
  // Never expose raw bytes in JSON responses
  const hasDbImage = !!(data.picture_mime || data.pictureUrl);
  delete data.picture_data;
  if (hasDbImage) {
    data.pictureUrl = imageUrlFor(data.id || data._id);
  }
  return data;
}

const categoryInclude = [{ model: Category, as: "category" }];

productService.createProductWithValidation = async (productData, user) => {
  const adminId = getAdminId(user);

  if (!productData.name) throw createError(400, "Product name is required");
  if (!productData.time_required || productData.time_required < 0) {
    throw createError(400, "Valid time required is necessary");
  }
  const category = await Category.findOne({
    where: { id: productData.category_id, created_by: adminId },
  });
  if (!category) throw createError(400, "Invalid category");

  const payload = {
    name: productData.name,
    description: productData.description,
    price: productData.price,
    category_id: productData.category_id,
    created_by: adminId,
    status: productData.status || "active",
    time_required: productData.time_required,
    pictureUrl: null,
    picture_data: productData.picture_data || null,
    picture_mime: productData.picture_mime || null,
  };

  try {
    const product = await Product.create(payload);
    // Store a stable URL pointing at our DB image endpoint
    if (product.picture_data) {
      const url = imageUrlFor(product.id);
      await product.update({ pictureUrl: url });
    }
    const created = await Product.findByPk(product.id, {
      attributes: PRODUCT_LIST_ATTRS,
      include: categoryInclude,
    });
    return mapProduct(created);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw createError(409, "Product name already exists");
    }
    throw createError(500, "Failed to create product", { details: err.message });
  }
};

productService.getAllProducts = async (user) => {
  const adminId = getAdminId(user);
  const products = await Product.findAll({
    where: { created_by: adminId },
    attributes: PRODUCT_LIST_ATTRS,
    include: categoryInclude,
  });
  return products.map(mapProduct);
};

productService.getProductsByCategory = async (categoryId, user) => {
  const adminId = getAdminId(user);
  const category = await Category.findOne({ where: { id: categoryId, created_by: adminId } });
  if (!category) throw createError(404, "Category not found");
  const products = await Product.findAll({
    where: { category_id: categoryId, created_by: adminId },
    attributes: PRODUCT_LIST_ATTRS,
    include: categoryInclude,
  });
  return products.map(mapProduct);
};

productService.getDeactiveProducts = async (user) => {
  const adminId = getAdminId(user);
  const products = await Product.findAll({
    where: { created_by: adminId, status: "deactive" },
    attributes: PRODUCT_LIST_ATTRS,
    include: categoryInclude,
  });
  return products.map(mapProduct);
};

productService.updateProduct = async (updateData, user) => {
  const adminId = getAdminId(user);
  if (!isValidId(updateData.id)) throw createError(400, "Invalid product ID");

  const existingProduct = await Product.findOne({
    where: { id: updateData.id, created_by: adminId },
  });
  if (!existingProduct) throw createError(404, "Product not found or unauthorized");

  if (updateData.category_id) {
    const category = await Category.findOne({
      where: { id: updateData.category_id, created_by: adminId },
    });
    if (!category) throw createError(400, "Invalid category");
  }

  const patch = {
    name: updateData.name || existingProduct.name,
    description: updateData.description || existingProduct.description,
    price: updateData.price || existingProduct.price,
    category_id: updateData.category_id || existingProduct.category_id,
    status: updateData.status || existingProduct.status,
    time_required:
      updateData.time_required !== undefined
        ? updateData.time_required
        : existingProduct.time_required,
  };

  if (updateData.picture_data) {
    patch.picture_data = updateData.picture_data;
    patch.picture_mime = updateData.picture_mime || "image/jpeg";
    patch.pictureUrl = imageUrlFor(existingProduct.id);
  }

  await existingProduct.update(patch);

  const updated = await Product.findByPk(existingProduct.id, {
    attributes: PRODUCT_LIST_ATTRS,
    include: categoryInclude,
  });
  return mapProduct(updated);
};

productService.updateProductStatus = async (productId, status, user) => {
  const adminId = getAdminId(user);
  if (!isValidId(productId)) throw createError(400, "Invalid product ID");

  const existingProduct = await Product.findOne({
    where: { id: productId, created_by: adminId },
  });
  if (!existingProduct) throw createError(404, "Product not found or unauthorized");

  if (!["active", "deactive"].includes(status)) {
    throw createError(400, "Invalid status. Must be 'active' or 'deactive'");
  }

  await existingProduct.update({ status });
  const updated = await Product.findByPk(productId, {
    attributes: PRODUCT_LIST_ATTRS,
    include: categoryInclude,
  });
  return mapProduct(updated);
};

productService.deleteProduct = async (productId, user) => {
  const adminId = getAdminId(user);
  const product = await Product.findOne({ where: { id: productId, created_by: adminId } });
  if (!product) throw createError(404, "Product not found or unauthorized");
  await product.destroy();
  return true;
};

/** Return raw image bytes for <img src="..."> */
productService.getProductImage = async (productId) => {
  if (!isValidId(productId)) throw createError(400, "Invalid product ID");
  const product = await Product.findByPk(productId, {
    attributes: ["id", "picture_data", "picture_mime", "pictureUrl"],
  });
  if (!product || !product.picture_data) {
    throw createError(404, "Image not found");
  }
  return {
    data: product.picture_data,
    mime: product.picture_mime || "image/jpeg",
  };
};

module.exports = productService;
