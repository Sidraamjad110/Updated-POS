const argon2 = require("argon2");
const Joi = require("joi");
const createError = require("http-errors");
const { Op } = require("sequelize");
const { Order, OrderItem, Product, Queue } = require("../models");
const { serialize } = require("./serialize");

let commonFunctions = {};

/** =======================================
 * ✅ General Utilities
 * ======================================= */
commonFunctions.messageLogs = (error, success) => {
  if (error) console.log(`\x1b[31m` + error);
  else console.log(`\x1b[32m` + success);
};

commonFunctions.userinfo = {
  name: Joi.string().required().description("User name").example("John Doe").default("John Doe"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .description("User email")
    .example("john@example.com")
    .default("john@example.com")
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(128)
    .custom((value, helpers) => {
      if (/\s/.test(value)) {
        return helpers.message("Password cannot contain spaces");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.message("Password must include at least one lowercase letter");
      }
      if (!/[A-Z]/.test(value)) {
        return helpers.message("Password must include at least one uppercase letter");
      }
      if (!/[0-9]/.test(value)) {
        return helpers.message("Password must include at least one number");
      }
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
        return helpers.message("Password must include at least one special character");
      }
      if (/(.)\1{2,}/.test(value)) {
        return helpers.message(
          "Password cannot contain more than 2 consecutive identical characters"
        );
      }
      return value;
    })
    .description(
      "User password. Must be 8-128 chars with uppercase, lowercase, number, and special character"
    )
    .example("Password123!")
    .default("Password123!"),
};

commonFunctions.passwordValidation = commonFunctions.userinfo.password;

commonFunctions.convertErrorIntoReadableForm = (error) => {
  let errorMessage = "";
  if (error.message.indexOf("[") > -1) {
    errorMessage = error.message.substr(error.message.indexOf("["));
  } else {
    errorMessage = error.message;
  }
  errorMessage = errorMessage.replace(/"/g, "").replace("[", "").replace("]", "");
  error.message = errorMessage;
  return error;
};

commonFunctions.getAdminId = (userOrReq) => {
  const user = userOrReq.user || userOrReq;
  return user.user_type === "isadmin" ? user.user_id : user.created_by;
};

commonFunctions.authHeader = Joi.object({
  authorization: Joi.string().required().description("Bearer token").example("Bearer your_token"),
}).unknown();

commonFunctions.hashPassword = async (password) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw new Error("Failed to hash password");
  }
};

commonFunctions.comparePassword = async (plain, hashed) => {
  try {
    return await argon2.verify(hashed, plain);
  } catch (err) {
    return false;
  }
};

commonFunctions.calculateOrderTotals = async (items) => {
  let total_amount = 0;
  let totalPreparationTime = 0;
  for (const item of items) {
    const product = await Product.findByPk(item.product_id);
    if (!product) throw createError(404, `Product ${item.product_id} not found`);
    if (!item.quantity || item.quantity <= 0) throw createError(400, "Invalid quantity");
    if (!product.time_required || product.time_required < 0) {
      throw createError(400, `Invalid time_required for product ${product.name}`);
    }
    item.sub_total = Number(product.price) * item.quantity;
    total_amount += item.sub_total;
    totalPreparationTime += product.time_required * item.quantity;
  }
  if (totalPreparationTime > 1440) {
    throw createError(400, `Total preparation time (${totalPreparationTime} minutes) is too large`);
  }
  return { total_amount, totalPreparationTime };
};

commonFunctions.createQueueEntry = async (order, totalPreparationTime, user) => {
  const confirmedAt = new Date();
  const existingQueueEntries = await Queue.findAll({
    where: { created_by: user.user_id },
    order: [["estimated_completion", "DESC"]],
    limit: 1,
  });

  let estimatedCompletion =
    existingQueueEntries.length > 0 &&
    existingQueueEntries[0].estimated_completion > confirmedAt &&
    existingQueueEntries[0].estimated_completion <
      new Date(confirmedAt.getTime() + 24 * 60 * 60000)
      ? new Date(
          existingQueueEntries[0].estimated_completion.getTime() +
            totalPreparationTime * 60000
        )
      : new Date(confirmedAt.getTime() + totalPreparationTime * 60000);

  console.log(`Creating queue entry for order ${order.order_number}:`, {
    confirmedAt: confirmedAt.toISOString(),
    totalPreparationTime,
    estimatedCompletion: estimatedCompletion.toISOString(),
  });

  await Queue.create({
    order_id: order.id,
    order_number: order.order_number,
    preparation_time: totalPreparationTime,
    confirmed_at: confirmedAt,
    estimated_completion: estimatedCompletion,
    created_by: user.user_id,
  });

  return totalPreparationTime;
};

commonFunctions.formatOrderResponse = async (order, includeItems = true) => {
  const response = serialize(order);
  response.customer_name = order.customer_name;
  response.service_type = order.service_type;
  response.notification = order.notification;
  response.notification_status = order.notification_status;

  if (includeItems) {
    const orderItems = await OrderItem.findAll({
      where: { order_id: order.id },
      include: [{ model: Product, as: "product" }],
    });
    response.items = orderItems.map((item) => ({
      product: serialize(item.product),
      quantity: item.quantity,
      sub_total: Number(item.sub_total),
    }));
  }
  return response;
};

commonFunctions.formatQueueResponse = async (queue) => {
  const now = new Date();
  const validQueue = queue.filter(
    (entry) =>
      entry.order !== null &&
      entry.order.id !== null &&
      ["processing"].includes(entry.order.status)
  );

  if (validQueue.length === 0) {
    return { message: "No orders in queue" };
  }

  const orderIds = validQueue.map((entry) => entry.order.id);
  const orderItems = await OrderItem.findAll({
    where: { order_id: { [Op.in]: orderIds } },
    include: [{ model: Product, as: "product", attributes: ["id", "name"] }],
  });

  return {
    statusCode: 200,
    message: "Order queue retrieved",
    success: true,
    type: 1,
    data: {
      data: validQueue.map((entry) => {
        const orderData = entry.order;
        const timeLeft = Math.max(
          0,
          Math.round((entry.estimated_completion.getTime() - now.getTime()) / 60000)
        );
        const estimatedTime = entry.estimated_completion.toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Karachi",
        });
        const items = orderItems
          .filter((item) => item.order_id === orderData.id)
          .map((item) => ({
            product: { _id: item.product.id, name: item.product.name },
            quantity: item.quantity,
          }));
        return {
          order_number: entry.order_number,
          time_left: timeLeft,
          estimated_time: estimatedTime,
          order_id: orderData.id,
          order_type: orderData.order_type,
          status: orderData.status,
          customer_name: orderData.customer_name,
          service_type: orderData.service_type,
          notification: orderData.notification,
          notification_status: orderData.notification_status,
          items,
        };
      }),
    },
  };
};

commonFunctions.checkOrderPermission = async (orderId, user, field = "created_by") => {
  const order = await Order.findOne({ where: { id: orderId, [field]: user.user_id } });
  if (!order) throw createError(404, "Order not found or no permission");
  return order;
};

module.exports = commonFunctions;
