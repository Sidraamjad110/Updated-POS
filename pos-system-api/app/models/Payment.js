const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

  payment_method: { type: String, required: true },
  payment_status: { type: String, required: true },
  payment_date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
