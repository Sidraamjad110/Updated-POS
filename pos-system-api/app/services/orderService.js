const createError = require("http-errors");
const { Op } = require("sequelize");
const { Order, OrderItem, CustomerProfile, User, Queue, Product } = require("../models");
const {
  calculateOrderTotals,
  createQueueEntry,
  formatOrderResponse,
  formatQueueResponse,
  checkOrderPermission,
} = require("../utils/utils");
const { isValidId } = require("../utils/serialize");

const orderService = {};

const orderQueueInclude = [
  {
    model: Order,
    as: "order",
    attributes: [
      "id",
      "order_number",
      "order_type",
      "status",
      "customer_name",
      "service_type",
      "notification",
      "notification_status",
    ],
  },
];

orderService.createOrder = async (orderData, user) => {
  const { items, order_type = "online", customer_name, service_type } = orderData;
  if (!items || items.length === 0) throw createError(400, "Order items are required");

  let delivery_address;
  if (order_type === "online") {
    const userRecord = await User.findByPk(user.user_id);
    if (!userRecord || userRecord.user_type !== "customer") {
      throw createError(403, "Only customers can place online orders");
    }
    const customerProfile = await CustomerProfile.findOne({ where: { user_id: user.user_id } });
    if (!customerProfile) throw createError(404, "Customer profile not found");
    delivery_address = customerProfile.address;
  } else {
    delivery_address = null;
  }

  const { total_amount, totalPreparationTime } = await calculateOrderTotals(items);

  const savedOrder = await Order.create({
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

  const orderItems = items.map((item) => ({
    order_id: savedOrder.id,
    product_id: item.product_id,
    quantity: item.quantity,
    sub_total: item.sub_total,
    created_by: user.user_id,
  }));

  await OrderItem.bulkCreate(orderItems);

  let estimatedCompletion;
  if (order_type === "physical") {
    await createQueueEntry(savedOrder, totalPreparationTime, user);
    const queueEntry = await Queue.findOne({
      where: { order_id: savedOrder.id, created_by: user.user_id },
    });
    estimatedCompletion = queueEntry.estimated_completion;
  } else {
    const confirmedAt = new Date();
    const existingQueueEntries = await Queue.findAll({
      where: { created_by: user.user_id },
      order: [["estimated_completion", "DESC"]],
      limit: 1,
    });

    estimatedCompletion =
      existingQueueEntries.length > 0 &&
      existingQueueEntries[0].estimated_completion > confirmedAt &&
      existingQueueEntries[0].estimated_completion <
        new Date(confirmedAt.getTime() + 24 * 60 * 60000)
        ? new Date(
            existingQueueEntries[0].estimated_completion.getTime() +
              totalPreparationTime * 60000
          )
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
  const where =
    user.user_type === "isadmin"
      ? { created_by: user.user_id }
      : { user_id: user.user_id };

  const orders = await Order.findAll({ where });
  return Promise.all(orders.map((order) => formatOrderResponse(order)));
};

orderService.confirmOrder = async (orderId, user) => {
  const order = await checkOrderPermission(orderId, user);
  if (order.status !== "pending") throw createError(400, "Order not pending");

  const orderItems = await OrderItem.findAll({
    where: { order_id: order.id },
    include: [{ model: Product, as: "product" }],
  });

  let totalPreparationTime = 0;
  for (const item of orderItems) {
    const product = item.product;
    if (!product || !product.time_required || product.time_required < 0) {
      throw createError(
        400,
        `Invalid time_required for product ${product ? product.name : item.product_id}`
      );
    }
    totalPreparationTime += product.time_required * item.quantity;
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
  const queue = await Queue.findAll({
    where: { created_by: user.user_id },
    order: [["confirmed_at", "ASC"]],
    include: orderQueueInclude,
  });

  return await formatQueueResponse(queue, user);
};

orderService.getPhysicalOrderQueue = async (user) => {
  const physicalOrders = await Order.findAll({
    where: { order_type: "physical" },
    attributes: ["id"],
  });
  const physicalOrderIds = physicalOrders.map((o) => o.id);

  const queue = await Queue.findAll({
    where: {
      created_by: user.user_id,
      order_id: { [Op.in]: physicalOrderIds },
    },
    order: [["confirmed_at", "ASC"]],
    include: orderQueueInclude,
  });

  return await formatQueueResponse(queue, user);
};

orderService.getOrderByNumber = async (orderNumber, user) => {
  const order = await Order.findOne({
    where: { order_number: orderNumber, created_by: user.user_id },
  });
  if (!order) throw createError(404, "Order not found or no permission");

  return await formatOrderResponse(order);
};

orderService.markOrderPicked = async (orderNumber, user) => {
  const order = await Order.findOne({
    where: { order_number: orderNumber, created_by: user.user_id },
  });
  if (!order) throw createError(404, "Order not found or no permission");
  if (order.status !== "ready") throw createError(400, "Order not ready");
  if (order.payment_status !== "paid") {
    throw createError(400, "Order cannot be picked; payment is not completed");
  }

  order.status = order.order_type === "online" ? "shipped" : "picked";
  order.notification = "picked";
  order.notification_status = 0;
  await order.save();

  const deletedCount = await Queue.destroy({
    where: { order_id: order.id, created_by: user.user_id },
  });
  if (!deletedCount) throw createError(404, "Queue entry not found");

  return await formatOrderResponse(order, false);
};

orderService.cancelOrder = async (orderId, user) => {
  if (!isValidId(orderId)) throw createError(400, "Invalid order ID");

  const order = await Order.findOne({ where: { id: orderId, created_by: user.user_id } });
  if (!order) throw createError(404, "Order not found or no permission");

  order.notification = "cancel";
  order.notification_status = 0;
  await order.save();

  const canceledQueueEntry = await Queue.findOne({ where: { order_id: orderId } });

  await Order.destroy({ where: { id: orderId } });
  await OrderItem.destroy({ where: { order_id: orderId } });
  await Queue.destroy({ where: { order_id: orderId } });

  const subsequentEntries = await Queue.findAll({
    where: {
      created_by: user.user_id,
      confirmed_at: {
        [Op.gt]: canceledQueueEntry ? canceledQueueEntry.confirmed_at : new Date(0),
      },
    },
    order: [["confirmed_at", "ASC"]],
  });

  let previousCompletion = canceledQueueEntry ? canceledQueueEntry.confirmed_at : new Date();
  for (const entry of subsequentEntries) {
    const relatedOrder = await Order.findByPk(entry.order_id);
    if (relatedOrder && ["processing"].includes(relatedOrder.status)) {
      entry.estimated_completion = new Date(
        previousCompletion.getTime() + entry.preparation_time * 60000
      );
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
    await OrderItem.destroy({ where: { order_id: order.id } });
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      sub_total: item.sub_total,
      created_by: user.user_id,
    }));
    await OrderItem.bulkCreate(orderItems);
    order.total_amount = total_amount;
  }

  if (order.order_type === "online" && delivery_address) {
    order.delivery_address = delivery_address;
  }
  if (order.order_type === "physical") {
    order.customer_name = customer_name || null;
    order.service_type =
      service_type && ["dine_in", "take_away"].includes(service_type) ? service_type : null;
  }

  await order.save();
  return await formatOrderResponse(order);
};

orderService.getPendingOrders = async (user) => {
  const where = { status: "pending" };
  if (user.user_type === "isadmin") {
    where.created_by = user.user_id;
  } else {
    where.user_id = user.user_id;
  }

  const orders = await Order.findAll({ where });
  return Promise.all(orders.map((order) => formatOrderResponse(order)));
};

orderService.processPayment = async (orderId, { received_amount, payment_method }, user) => {
  if (!user || !user.user_type) {
    throw createError(401, "User not authenticated or missing user type");
  }
  if (user.user_type === "customer") {
    throw createError(403, "Customers cannot process payments");
  }

  if (!isValidId(orderId)) throw createError(400, "Invalid order ID");

  const order = await Order.findByPk(orderId);
  if (!order) throw createError(404, "Order not found");

  if (Number(received_amount) < Number(order.total_amount)) {
    throw createError(
      400,
      `Received amount (${received_amount}) is less than total amount (${order.total_amount})`
    );
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
  const order = await Order.findOne({
    where: { order_number: orderNumber, created_by: user.user_id },
  });
  if (!order) throw createError(404, "Order not found or no permission");
  if (!["processing", "confirmed"].includes(order.status)) {
    throw createError(400, "Order must be in processing or confirmed status to mark as ready");
  }
  order.status = "ready";
  order.notification = "ready";
  order.notification_status = 0;
  await order.save();

  const response = await formatOrderResponse(order, false);
  return {
    ...response,
    customer_name: order.customer_name,
    service_type: order.service_type,
    notification: order.notification,
    notification_status: order.notification_status,
  };
};

orderService.markNotificationRead = async (orderNumber, user) => {
  const order = await Order.findOne({
    where: { order_number: orderNumber, created_by: user.user_id },
  });
  if (!order) throw createError(404, "Order not found or no permission");

  order.notification_status = 1;
  await order.save();

  const response = await formatOrderResponse(order, false);
  return {
    ...response,
    customer_name: order.customer_name,
    service_type: order.service_type,
    notification: order.notification,
    notification_status: order.notification_status,
  };
};

module.exports = orderService;
