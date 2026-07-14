const createError = require("http-errors");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const CustomerProfile = require("../models/CustomerProfile");
const User = require("../models/User");
const Queue = require("../models/Queue");
const { calculateOrderTotals, createQueueEntry, formatOrderResponse, formatQueueResponse, checkOrderPermission } = require("../utils/utils");

const orderService = {};

orderService.createOrder = async (orderData, user) => {
  const { items, order_type = "online", customer_name, service_type } = orderData;
  if (!items || items.length === 0) throw createError(400, "Order items are required");

  let delivery_address;
  if (order_type === "online") {
    const userRecord = await User.findById(user.user_id);
    if (!userRecord || userRecord.user_type !== "customer") {
      throw createError(403, "Only customers can place online orders");
    }
    const customerProfile = await CustomerProfile.findOne({ user_id: user.user_id });
    if (!customerProfile) throw createError(404, `Customer profile not found`);
    delivery_address = customerProfile.address;
  } else {
    delivery_address = null;
  }

  const { total_amount, totalPreparationTime } = await calculateOrderTotals(items);

  const order = new Order({
    user_id: order_type === "online" ? user.user_id : null,
    order_date: new Date(),
    created_by: user.user_id,
    total_amount,
    status: order_type === "online" ? "pending" : "processing",
    delivery_address,
    order_type,
    customer_name: order_type === "physical" ? customer_name : null,
    service_type: order_type === "physical" ? service_type : null,
    notification: order_type === "online" ? "pending" : "confirmed",
    notification_status: 0,
  });

  const savedOrder = await order.save();
  const orderItems = items.map((item) => ({
    order_id: savedOrder._id,
    product_id: item.product_id,
    quantity: item.quantity,
    sub_total: item.sub_total,
    created_by: user.user_id,
  }));

  await OrderItem.insertMany(orderItems);

  let estimatedCompletion;
  if (order_type === "physical") {
    await createQueueEntry(savedOrder, totalPreparationTime, user);
    const queueEntry = await Queue.findOne({ order_id: savedOrder._id, created_by: user.user_id });
    estimatedCompletion = queueEntry.estimated_completion;
  } else {
    // For online orders, calculate estimated completion time without creating a queue entry
    const confirmedAt = new Date();
    const existingQueueEntries = await Queue.find({ created_by: user.user_id })
      .sort({ estimated_completion: -1 })
      .limit(1);

    estimatedCompletion = existingQueueEntries.length > 0 &&
      existingQueueEntries[0].estimated_completion > confirmedAt &&
      existingQueueEntries[0].estimated_completion < new Date(confirmedAt.getTime() + 24 * 60 * 60000)
      ? new Date(existingQueueEntries[0].estimated_completion.getTime() + totalPreparationTime * 60000)
      : new Date(confirmedAt.getTime() + totalPreparationTime * 60000);
  }

  const response = await formatOrderResponse(savedOrder);
  response.estimated_completion = estimatedCompletion.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  });

  return response;
};

orderService.getOrdersByUser = async (user) => {
  let query = {};
  if (user.user_type === "isadmin") {
    query = { created_by: user.user_id };
  } else {
    query = { user_id: user.user_id };
  }

  const orders = await Order.find(query);
  return Promise.all(orders.map((order) => formatOrderResponse(order)));
};

orderService.confirmOrder = async (orderId, user) => {
  const order = await checkOrderPermission(orderId, user);
  if (order.status !== "pending") throw createError(400, "Order not pending");

  const orderItems = await OrderItem.find({ order_id: order._id }).populate("product_id");
  let totalPreparationTime = 0;
  for (const item of orderItems) {
    if (!item.product_id.time_required || item.product_id.time_required < 0) {
      throw createError(400, `Invalid time_required for product ${item.product_id.name}`);
    }
    totalPreparationTime += item.product_id.time_required * item.quantity;
  }

  if (totalPreparationTime > 1440) {
    throw createError(400, `Total preparation time (${totalPreparationTime} minutes) is too large`);
  }

  order.status = "processing";
  order.notification = "confirmed";
  order.notification_status = 0;
  await order.save();

  await createQueueEntry(order, totalPreparationTime, user);
  return await formatOrderResponse(order);
};

orderService.getOrderQueue = async (user) => {
  const queue = await Queue.find({ created_by: user.user_id })
    .sort({ confirmed_at: 1 })
    .populate({
      path: "order_id",
      select: "order_number order_type status customer_name service_type notification notification_status",
    });

  return await formatQueueResponse(queue, user);
};

orderService.getPhysicalOrderQueue = async (user) => {
  const queue = await Queue.find({
    created_by: user.user_id,
    order_id: { $in: await Order.find({ order_type: "physical" }).distinct("_id") },
  })
    .sort({ confirmed_at: 1 })
    .populate({
      path: "order_id",
      select: "order_number order_type status customer_name service_type notification notification_status",
    });

  return await formatQueueResponse(queue, user);
};

orderService.getOrderByNumber = async (orderNumber, user) => {
  const order = await Order.findOne({ order_number: orderNumber, created_by: user.user_id });
  if (!order) throw createError(404, "Order not found or no permission");

  return await formatOrderResponse(order);
};

orderService.markOrderPicked = async (orderNumber, user) => {
  const order = await Order.findOne({ order_number: orderNumber, created_by: user.user_id });
  if (!order) throw createError(404, "Order not found or no permission");
  if (order.status !== "ready") throw createError(400, "Order not ready");
  if (order.payment_status !== "paid") throw createError(400, "Order cannot be picked; payment is not completed");

  order.status = order.order_type === "online" ? "shipped" : "picked";
  order.notification = "picked";
  order.notification_status = 0;
  await order.save();

  const deletedQueueEntry = await Queue.findOneAndDelete({
    order_id: order._id,
    created_by: user.user_id,
  });
  if (!deletedQueueEntry) throw createError(404, "Queue entry not found");

  return await formatOrderResponse(order, false);
};

orderService.cancelOrder = async (orderId, user) => {
  const order = await Order.findOne({ _id: orderId, created_by: user.user_id });
  if (!order) throw createError(404, "Order not found or no permission");

  order.notification = "cancel";
  order.notification_status = 0;
  await order.save();

  // Find the queue entry for the canceled order
  const canceledQueueEntry = await Queue.findOne({ order_id: orderId });
  const canceledTime = canceledQueueEntry ? canceledQueueEntry.preparation_time : 0;

  // Delete the order, its items, and queue entry
  await Order.deleteOne({ _id: orderId });
  await OrderItem.deleteMany({ order_id: orderId });
  await Queue.deleteOne({ order_id: orderId });

  // Adjust subsequent queue entries
  const subsequentEntries = await Queue.find({
    created_by: user.user_id,
    confirmed_at: { $gt: canceledQueueEntry ? canceledQueueEntry.confirmed_at : new Date(0) },
  }).sort({ confirmed_at: 1 });

  let previousCompletion = canceledQueueEntry ? canceledQueueEntry.confirmed_at : new Date();
  for (const entry of subsequentEntries) {
    const order = await Order.findById(entry.order_id);
    if (order && ["processing"].includes(order.status)) {
      entry.estimated_completion = new Date(previousCompletion.getTime() + entry.preparation_time * 60000);
      await entry.save();
      previousCompletion = entry.estimated_completion;
    }
  }

  return { message: "Order and related data deleted successfully" };
};

orderService.updateOrder = async (orderId, updateData, user) => {
  const order = await checkOrderPermission(orderId, user);
  if (order.status !== "pending") throw createError(400, "Cannot update order; it is already in process");

  const { items, delivery_address, customer_name, service_type } = updateData;
  if (items) {
    const { total_amount } = await calculateOrderTotals(items);
    await OrderItem.deleteMany({ order_id: order._id });
    const orderItems = items.map((item) => ({
      order_id: order._id,
      product_id: item.product_id,
      quantity: item.quantity,
      sub_total: item.sub_total,
      created_by: user.user_id,
    }));
    await OrderItem.insertMany(orderItems);
    order.total_amount = total_amount;
  }

  if (order.order_type === "online" && delivery_address) {
    order.delivery_address = delivery_address;
  }
  if (order.order_type === "physical") {
    order.customer_name = customer_name || null;
    order.service_type = service_type && ["dine_in", "take_away"].includes(service_type) ? service_type : null;
  }

  await order.save();
  return await formatOrderResponse(order);
};

orderService.getPendingOrders = async (user) => {
  let query = { status: "pending" };
  if (user.user_type === "isadmin") {
    query.created_by = user.user_id;
  } else {
    query.user_id = user.user_id;
  }

  const orders = await Order.find(query);
  return Promise.all(orders.map((order) => formatOrderResponse(order)));
};

orderService.processPayment = async (orderId, { received_amount, payment_method }, user) => {
  if (!user || !user.user_type) {
    throw createError(401, "User not authenticated or missing user type");
  }
  if (user.user_type === "customer") {
    throw createError(403, "Customers cannot process payments");
  }

  const order = await Order.findOne({ _id: orderId });
  if (!order) throw createError(404, "Order not found");

  if (received_amount < order.total_amount) {
    throw createError(400, `Received amount (${received_amount}) is less than total amount (${order.total_amount})`);
  }

  if (payment_method && !["cash", "card", "online"].includes(payment_method)) {
    throw createError(400, "Invalid payment method");
  }

  order.payment_status = "paid";
  order.received_amount = received_amount;
  order.payment_method = payment_method || order.payment_method;
  await order.save();

  return await formatOrderResponse(order, false);
};

orderService.markOrderReady = async (orderNumber, user) => {
  const order = await Order.findOne({ order_number: orderNumber, created_by: user.user_id });
  if (!order) throw createError(404, "Order not found or no permission");
  if (!["processing", "confirmed"].includes(order.status)) throw createError(400, "Order must be in processing or confirmed status to mark as ready");
  order.status = "ready";
  order.notification = "ready";
  order.notification_status = 0;
  await order.save();
  return {
    ...order._doc,
    customer_name: order.customer_name,
    service_type: order.service_type,
    notification: order.notification,
    notification_status: order.notification_status,
  };
};

orderService.markNotificationRead = async (orderNumber, user) => {
  const order = await Order.findOne({ order_number: orderNumber, created_by: user.user_id });
  if (!order) throw createError(404, "Order not found or no permission");

  order.notification_status = 1;
  await order.save();

  return {
    ...order._doc,
    customer_name: order.customer_name,
    service_type: order.service_type,
    notification: order.notification,
    notification_status: order.notification_status,
  };
};

module.exports = orderService;