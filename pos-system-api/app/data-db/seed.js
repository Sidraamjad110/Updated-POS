"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config();

const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/resturentdb";

// Mongoose Schemas
const roleSchema = new mongoose.Schema({ name: String });

const permissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  can_add_category: Boolean,
  can_delete_category: Boolean,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  description: String,
});

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  total_amount: Number,
  status: String,
});

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  status: String,
  method: String,
});

// Models
const Role = mongoose.model("Role", roleSchema);
const Permission = mongoose.model("Permission", permissionSchema);
const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Payment = mongoose.model("Payment", paymentSchema);

// Helper to read JSON file
function readJSON(fileName) {
  const filePath = path.join(__dirname, "seed-data", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function seed() {
  try {
    await mongoose.connect(MONGOURI);
    console.log("✅ MongoDB connected");

    // Clear existing data
    await Promise.all([
      Role.deleteMany({}),
      Permission.deleteMany({}),
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Payment.deleteMany({}),
    ]);

    // Seed Roles
    const rolesData = readJSON("roles.json");
    const roles = await Role.insertMany(rolesData);
    console.log("✅ Seeded roles");

    const roleMap = {};
    roles.forEach((role) => {
      roleMap[role.name.toUpperCase()] = role._id;
    });

    // Seed Permissions
    let permissionsData = readJSON("permissions.json");
    permissionsData = permissionsData.map((perm) => {
      const roleKey = perm.role_id.match(/ROLE_(\w+)_ID_PLACEHOLDER/)[1];
      perm.role_id = roleMap[roleKey];
      return perm;
    });
    await Permission.insertMany(permissionsData);
    console.log("✅ Seeded permissions");

    // Seed Users
    let usersData = readJSON("users.json");
    usersData = usersData.map((user) => {
      const roleKey = user.role_id.match(/ROLE_(\w+)_ID_PLACEHOLDER/)[1];
      user.role_id = roleMap[roleKey];
      return user;
    });
    const users = await User.insertMany(usersData);
    console.log("✅ Seeded users");

    const userMap = {};
    users.forEach((user) => {
      userMap[user.email] = user._id;
    });

    // Seed Categories
    const categoriesData = readJSON("categories.json");
    const categories = await Category.insertMany(categoriesData);
    console.log("✅ Seeded categories");

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Seed Products
    let productsData = readJSON("products.json");
    productsData = productsData.map((prod) => {
      prod.category_id = categoryMap[prod.category];
      delete prod.category;
      return prod;
    });
    const products = await Product.insertMany(productsData);
    console.log("✅ Seeded products");

    const productMap = {};
    products.forEach((product) => {
      productMap[product.name] = product._id;
    });

    // Seed Orders
    let ordersData = readJSON("orders.json");
    ordersData = ordersData.map((order) => {
      order.user_id = userMap["bob.customer@example.com"]; // adjust based on your data
      order.items = order.items.map((item) => {
        item.product_id = productMap[item.product_id];
        return item;
      });
      return order;
    });
    const orders = await Order.insertMany(ordersData);
    console.log("✅ Seeded orders");

    // Seed Payments
    let paymentsData = readJSON("payments.json");
    paymentsData = paymentsData.map((payment) => {
      payment.order_id = orders[0]._id; // assuming first order
      return payment;
    });
    await Payment.insertMany(paymentsData);
    console.log("✅ Seeded payments");

    await mongoose.disconnect();
    console.log("✅ Seeding completed and disconnected");
  } catch (error) {
    console.error("❌ Seed error:", error);
    await mongoose.disconnect();
  }
}

seed();
