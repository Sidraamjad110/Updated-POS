const Joi = require('joi');
const { createOrder, getOrdersByUser, confirmOrder, getOrderQueue, getOrderByNumber, processPayment, markOrderPicked, markOrderReady, getPhysicalOrderQueue, cancelOrder, updateOrder, getPendingOrders, markNotificationRead } = require('../../controllers/orderController');
const { AVAILABLE_AUTHS } = require('../../utils/constants');
const { authHeader } = require('../../utils/utils');

const apiPrefix = '/orders/api/v1/';

const routes = [
  {
    method: 'POST',
    path: `${apiPrefix}create`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        items: Joi.array().items(
          Joi.object({
            product_id: Joi.string().required().description('Product ID').example('product123'),
            quantity: Joi.number().min(1).required().description('Quantity').example(2),
          })
        ).min(1).required().description('Array of order items'),
        order_type: Joi.string().valid('online', 'physical').required().description('Order type').example('online'),
        customer_name: Joi.string().optional().description('Customer name for physical orders').example('John Doe'),
        service_type: Joi.string().valid('dine_in', 'take_away').optional().description('Service type for physical orders').example('dine_in'),
      }),
      group: 'Orders',
      description: 'Create a new order',
      model: 'CreateOrder',
    },
    handler: createOrder,
  },
  {
    method: 'POST',
    path: `${apiPrefix}by-number`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_number: Joi.string().regex(/^\d{4}-RPOS-\d{3}$/).required().description('Order number to retrieve').example('2506-RPOS-001'),
      }),
      group: 'Orders',
      description: 'Get order details by order number',
      model: 'GetOrderByNumber',
    },
    handler: getOrderByNumber,
  },
  {
    method: 'GET',
    path: `${apiPrefix}list`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: 'Orders',
      description: 'Get orders for the authenticated user',
      model: 'GetOrdersByUser',
    },
    handler: getOrdersByUser,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}confirm`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_id: Joi.string().required().description('Order ID to confirm').example('order123'),
      }),
      group: 'Orders',
      description: 'Confirm an order and add to queue',
      model: 'ConfirmOrder',
    },
    handler: confirmOrder,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}payment`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_id: Joi.string().required().description('Order ID to process payment').example('order123'),
        received_amount: Joi.number().min(0).required().description('Received payment amount').example(100),
        payment_method: Joi.string().valid('cash', 'card', 'online').optional().description('Payment method').example('cash'),
      }),
      group: 'Orders',
      description: 'Process payment for an order',
      model: 'ProcessPayment',
    },
    handler: processPayment,
  },
  {
    method: 'GET',
    path: `${apiPrefix}queue`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: 'Orders',
      description: 'Get current order queue with estimated completion times',
      model: 'GetOrderQueue',
    },
    handler: getOrderQueue,
  },
  {
    method: 'GET',
    path: `${apiPrefix}physical-queue`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: 'Orders',
      description: 'Get current physical order queue',
      model: 'GetPhysicalOrderQueue',
    },
    handler: getPhysicalOrderQueue,
  },
  {
    method: 'GET',
    path: `${apiPrefix}pending`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      group: 'Orders',
      description: 'Get all pending (non-confirmed) orders for the authenticated user',
      model: 'GetPendingOrders',
    },
    handler: getPendingOrders,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}picked`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_number: Joi.string().regex(/^\d{4}-RPOS-\d{3}$/).required().description('Order number to mark as picked').example('2506-RPOS-001'),
      }),
      group: 'Orders',
      description: 'Mark order as picked and remove from queue',
      model: 'MarkOrderPicked',
    },
    handler: markOrderPicked,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}ready`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_number: Joi.string().regex(/^\d{4}-RPOS-\d{3}$/).required().description('Order number to mark as ready').example('2506-RPOS-001'),
      }),
      group: 'Orders',
      description: 'Mark order as ready for pickup',
      model: 'MarkOrderReady',
    },
    handler: markOrderReady,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}cancel`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_id: Joi.string().required().description('Order ID to cancel').example('order123'),
      }),
      group: 'Orders',
      description: 'Cancel a pending order',
      model: 'CancelOrder',
    },
    handler: cancelOrder,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}update`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_id: Joi.string().required().description('Order ID to update').example('order123'),
        items: Joi.array().items(
          Joi.object({
            product_id: Joi.string().required().description('Product ID').example('product123'),
            quantity: Joi.number().min(1).required().description('Quantity').example(2),
          })
        ).optional().description('Array of order items'),
        delivery_address: Joi.string().optional().description('Delivery address for online orders').example('123 Main St'),
        customer_name: Joi.string().optional().description('Customer name for physical orders').example('John Doe'),
        service_type: Joi.string().valid('dine_in', 'take_away').optional().description('Service type for physical orders').example('dine_in'),
      }),
      group: 'Orders',
      description: 'Update a pending order',
      model: 'UpdateOrder',
    },
    handler: updateOrder,
  },
  {
    method: 'PUT',
    path: `${apiPrefix}notification`,
    auth: AVAILABLE_AUTHS.AUTH_TOKEN,
    joiSchemaForSwagger: {
      headers: authHeader,
      body: Joi.object({
        order_number: Joi.string().regex(/^\d{4}-RPOS-\d{3}$/).required().description('Order number to mark notification as read').example('2506-RPOS-001'),
      }),
      group: 'Orders',
      description: 'Mark order notification as read',
      model: 'MarkNotificationRead',
    },
    handler: markNotificationRead,
  },
];

module.exports = routes;