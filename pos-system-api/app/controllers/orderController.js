const orderService = require("../services/orderService");
const { handleResponse } = require("../helpers/resHelper");

const orderController = {};

orderController.createOrder = async (req, res, next) => {
  const { items, order_type, customer_name, service_type } = req.body;
  const promise = orderService.createOrder({ items, order_type, customer_name, service_type }, req.user);
  handleResponse(res, promise, "Order created");
};

orderController.confirmOrder = async (req, res, next) => {
  const { order_id } = req.body;
  const promise = orderService.confirmOrder(order_id, req.user);
  handleResponse(res, promise, "Order confirmed and added to queue");
};

orderController.getOrderQueue = async (req, res, next) => {
  const promise = orderService.getOrderQueue(req.user);
  handleResponse(res, promise, "Order queue retrieved");
};

orderController.getPhysicalOrderQueue = async (req, res, next) => {
  const promise = orderService.getPhysicalOrderQueue(req.user);
  handleResponse(res, promise, "Physical order queue retrieved");
};

orderController.getPendingOrders = async (req, res, next) => {
  const promise = orderService.getPendingOrders(req.user);
  handleResponse(res, promise, "Pending orders retrieved");
};

orderController.getOrdersByUser = async (req, res, next) => {
  const promise = orderService.getOrdersByUser(req.user);
  handleResponse(res, promise, "");
};

orderController.markOrderPicked = async (req, res, next) => {
  const { order_number } = req.body;
  const promise = orderService.markOrderPicked(order_number, req.user);
  handleResponse(res, promise, "Order marked as picked");
};

orderController.processPayment = async (req, res, next) => {
  const { order_id, received_amount, payment_method } = req.body;
  const promise = orderService.processPayment(order_id, { received_amount, payment_method }, req.user);
  handleResponse(res, promise, "Payment processed successfully");
};

orderController.markOrderReady = async (req, res, next) => {
  const { order_number } = req.body;
  const promise = orderService.markOrderReady(order_number, req.user);
  handleResponse(res, promise, "Order marked as ready");
};

orderController.getOrderByNumber = async (req, res, next) => {
  const { order_number } = req.body;
  const promise = orderService.getOrderByNumber(order_number, req.user);
  handleResponse(res, promise, "Order retrieved");
};

orderController.cancelOrder = async (req, res, next) => {
  const { order_id } = req.body;
  const promise = orderService.cancelOrder(order_id, req.user);
  handleResponse(res, promise, "Order cancelled");
};

orderController.updateOrder = async (req, res, next) => {
  const { order_id, items, delivery_address, customer_name, service_type } = req.body;
  const promise = orderService.updateOrder(order_id, { items, delivery_address, customer_name, service_type }, req.user);
  handleResponse(res, promise, "Order updated");
};

orderController.markNotificationRead = async (req, res, next) => {
  const { order_number } = req.body;
  const promise = orderService.markNotificationRead(order_number, req.user);
  handleResponse(res, promise, "Notification marked as read");
};

module.exports = orderController;