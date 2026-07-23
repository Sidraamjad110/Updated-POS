"use strict";

const fs = require("fs");
const path = require("path");

require("dotenv").config();

const {
  sequelize,
  User,
  Role,
  Permission,
  RolePermission,
  Category,
  Product,
  Order,
  OrderItem,
  Payment,
} = require("../models");
const COMMON_FUN = require("../utils/utils");

function readJSON(fileName) {
  const filePath = path.join(__dirname, "seed-data", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function clearAll() {
  await Payment.destroy({ where: {} });
  await OrderItem.destroy({ where: {} });
  await Order.destroy({ where: {} });
  await Product.destroy({ where: {} });
  await Category.destroy({ where: {} });
  await RolePermission.destroy({ where: {} });
  await Permission.destroy({ where: {} });
  await User.destroy({ where: {} });
  await Role.destroy({ where: {} });
}

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    await clearAll();

    const adminPassword = await COMMON_FUN.hashPassword("Admin123!");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      user_type: "isadmin",
      role_id: null,
      created_by: null,
      store_name: "Demo Store",
      theme: "light",
    });

    const rolesData = readJSON("roles.json");
    const roleMap = {};
    for (const roleData of rolesData) {
      const role = await Role.create({
        name: roleData.name,
        description: roleData.description || null,
        created_by: admin.id,
      });
      roleMap[role.name.toUpperCase()] = role.id;
    }

    const permissionsData = readJSON("permissions.json");
    const permissionMap = {};
    for (const permData of permissionsData) {
      const key = permData.key || permData.name;
      const permission = await Permission.create({
        key,
        description: permData.description || key,
        created_by: admin.id,
      });
      permissionMap[key] = permission.id;
    }

    const adminRole = await Role.findOne({ where: { name: "admin", created_by: admin.id } });
    if (adminRole) {
      await adminRole.setPermissions(Object.values(permissionMap));
    }

    const managerRole = await Role.findOne({ where: { name: "manager", created_by: admin.id } });
    if (managerRole) {
      const managerKeys = ["can_add_category", "can_edit_menu", "can_manage_orders"];
      await managerRole.setPermissions(
        managerKeys.filter((k) => permissionMap[k]).map((k) => permissionMap[k])
      );
    }

    const workerRole = await Role.findOne({ where: { name: "worker", created_by: admin.id } });
    if (workerRole) {
      const workerKeys = ["can_manage_orders"];
      await workerRole.setPermissions(
        workerKeys.filter((k) => permissionMap[k]).map((k) => permissionMap[k])
      );
    }

    console.log("✅ Seeded roles and permissions");

    const usersData = readJSON("users.json");
    const userMap = { [admin.email]: admin.id };
    for (const userData of usersData) {
      if (userData.email === admin.email) continue;

      let roleId = null;
      if (userData.role_id && typeof userData.role_id === "string") {
        const match = userData.role_id.match(/ROLE_(\w+)_ID_PLACEHOLDER/);
        if (match) roleId = roleMap[match[1]] || null;
      }

      const userType =
        userData.user_type === "admin" ? "isadmin" : userData.user_type || "worker";

      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: await COMMON_FUN.hashPassword(userData.password || "Password123!"),
        user_type: userType,
        role_id: userType === "isadmin" ? null : roleId,
        created_by: admin.id,
      });
      userMap[user.email] = user.id;
    }
    console.log("✅ Seeded users");

    const categoriesData = readJSON("categories.json");
    const categoryMap = {};
    for (const catData of categoriesData) {
      const category = await Category.create({
        name: catData.name,
        description: catData.description || null,
        created_by: admin.id,
      });
      categoryMap[catData.name] = category.id;
    }
    console.log("✅ Seeded categories");

    const productsData = readJSON("products.json");
    const productMap = {};
    const categoryNames = Object.keys(categoryMap);
    for (let i = 0; i < productsData.length; i++) {
      const prodData = productsData[i];
      const categoryId =
        categoryMap[prodData.category] ||
        categoryMap[categoryNames[i % categoryNames.length]];

      const product = await Product.create({
        name: prodData.name,
        description: prodData.description || prodData.name,
        price: prodData.price,
        category_id: categoryId,
        created_by: admin.id,
        time_required: prodData.time_required || 15,
        status: "active",
      });
      productMap[product.name] = product.id;
    }
    console.log("✅ Seeded products");

    const ordersData = readJSON("orders.json");
    const productIds = Object.values(productMap);
    for (const orderData of ordersData) {
      const customerId =
        userMap["customer@example.com"] || userMap["bob.customer@example.com"] || admin.id;

      const order = await Order.create({
        user_id: customerId,
        order_date: new Date(),
        created_by: admin.id,
        total_amount: orderData.total_amount || 0,
        status: orderData.status === "placed" ? "pending" : orderData.status || "pending",
        order_type: "online",
        payment_status: "not_paid",
      });

      const items = orderData.items || [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const productId = productIds[i % productIds.length];
        const product = await Product.findByPk(productId);
        await OrderItem.create({
          order_id: order.id,
          product_id: productId,
          quantity: item.quantity || 1,
          sub_total: Number(product.price) * (item.quantity || 1),
          created_by: admin.id,
        });
      }
    }
    console.log("✅ Seeded orders");

    const paymentsData = readJSON("payments.json");
    const firstOrder = await Order.findOne({ order: [["createdAt", "ASC"]] });
    if (firstOrder) {
      for (const paymentData of paymentsData) {
        await Payment.create({
          payment_method: paymentData.method || paymentData.payment_method || "card",
          payment_status: paymentData.status || paymentData.payment_status || "paid",
          payment_date: new Date(),
        });
      }
    }
    console.log("✅ Seeded payments");

    await sequelize.close();
    console.log("✅ Seeding completed and disconnected");
  } catch (error) {
    console.error("❌ Seed error:", error);
    await sequelize.close();
    process.exit(1);
  }
}

seed();
