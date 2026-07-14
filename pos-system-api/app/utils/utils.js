const argon2 = require("argon2");
const Joi = require("joi");
const createError = require("http-errors");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const Queue = require("../models/Queue");

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
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value)) {
        return helpers.message("Password must include at least one lowercase letter");
      }
      if (!/[A-Z]/.test(value)) {
        return helpers.message("Password must include at least one uppercase letter");
      }
      if (!/\d/.test(value)) {
        return helpers.message("Password must include at least one number");
      }
      if (!/^[A-Za-z\d]+$/.test(value)) {
        return helpers.message("Password can only contain letters and numbers");
      }
      return value;
    })
    .description("User password. Must be at least 8 characters, include uppercase, lowercase, and number")
    .example("Password123")
    .default("Password123"),
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
  let total_amount = 0, totalPreparationTime = 0;
  for (const item of items) {
    const product = await Product.findById(item.product_id);
    if (!product) throw createError(404, `Product ${item.product_id} not found`);
    if (!item.quantity || item.quantity <= 0) throw createError(400, "Invalid quantity");
    if (!product.time_required || product.time_required < 0) {
      throw createError(400, `Invalid time_required for product ${product.name}`);
    }
    item.sub_total = product.price * item.quantity;
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
  const existingQueueEntries = await Queue.find({ created_by: user.user_id })
    .sort({ estimated_completion: -1 })
    .limit(1);

  let estimatedCompletion = existingQueueEntries.length > 0 &&
    existingQueueEntries[0].estimated_completion > confirmedAt &&
    existingQueueEntries[0].estimated_completion < new Date(confirmedAt.getTime() + 24 * 60 * 60000)
    ? new Date(existingQueueEntries[0].estimated_completion.getTime() + totalPreparationTime * 60000)
    : new Date(confirmedAt.getTime() + totalPreparationTime * 60000);

  console.log(`Creating queue entry for order ${order.order_number}:`, {
    confirmedAt: confirmedAt.toISOString(),
    totalPreparationTime,
    estimatedCompletion: estimatedCompletion.toISOString(),
  });

  const queueEntry = new Queue({
    order_id: order._id,
    order_number: order.order_number,
    preparation_time: totalPreparationTime,
    confirmed_at: confirmedAt,
    estimated_completion: estimatedCompletion,
    created_by: user.user_id,
  });

  await queueEntry.save();
  return totalPreparationTime;
};

commonFunctions.formatOrderResponse = async (order, includeItems = true) => {
  const response = {
    ...order._doc,
    customer_name: order.customer_name,
    service_type: order.service_type,
    notification: order.notification,
    notification_status: order.notification_status,
  };
  if (includeItems) {
    const orderItems = await OrderItem.find({ order_id: order._id }).populate("product_id");
    response.items = orderItems.map((item) => ({
      product: item.product_id,
      quantity: item.quantity,
      sub_total: item.sub_total,
    }));
  }
  return response;
};

commonFunctions.formatQueueResponse = async (queue, user) => {
  const now = new Date();
  const validQueue = queue.filter(
    (entry) =>
      entry.order_id !== null &&
      entry.order_id._id !== null &&
      ["processing"].includes(entry.order_id.status)
  );

  if (validQueue.length === 0) {
    return { message: "No orders in queue" };
  }

  const orderIds = validQueue.map((entry) => entry.order_id._id);
  const orderItems = await OrderItem.find({ order_id: { $in: orderIds } }).populate("product_id");

  return {
    statusCode: 200,
    message: "Order queue retrieved",
    success: true,
    type: 1,
    data: {
      data: validQueue.map((entry) => {
        const timeLeft = Math.max(0, Math.round((entry.estimated_completion.getTime() - now.getTime()) / 60000)); // Changed from Math.ceil to Math.round
        const estimatedTime = entry.estimated_completion.toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Karachi",
        });
        const items = orderItems
          .filter((item) => item.order_id.toString() === entry.order_id._id.toString())
          .map((item) => ({
            product: { _id: item.product_id._id, name: item.product_id.name },
            quantity: item.quantity,
          }));
        return {
          order_number: entry.order_number,
          time_left: timeLeft,
          estimated_time: estimatedTime,
          order_id: entry.order_id._id,
          order_type: entry.order_id.order_type,
          status: entry.order_id.status,
          customer_name: entry.order_id.customer_name,
          service_type: entry.order_id.service_type,
          notification: entry.order_id.notification,
          notification_status: entry.order_id.notification_status,
          items,
        };
      }),
    },
  };
};

commonFunctions.checkOrderPermission = async (orderId, user, field = "created_by") => {
  const order = await Order.findOne({ _id: orderId, [field]: user.user_id });
  if (!order) throw createError(404, "Order not found or no permission");
  return order;
};

module.exports = commonFunctions;