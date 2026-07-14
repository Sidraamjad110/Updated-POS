// filename: Queue.js
const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  order_number: { type: String, required: true },
  preparation_time: { type: Number, required: true }, // in minutes
  confirmed_at: { type: Date, required: true },
  estimated_completion: { type: Date, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Queue', queueSchema);