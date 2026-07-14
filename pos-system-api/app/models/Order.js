const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order_date: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  order_number: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'ready', 'picked'], 
    default: 'pending' 
  },
  delivery_address: { type: String },
  order_type: { 
    type: String, 
    enum: ['online', 'physical'], 
    required: true,
    default: 'online'
  },
  payment_method: { 
    type: String, 
    enum: ['cash', 'card'], 
    default: null 
  },
  payment_status: { 
    type: String, 
    enum: ['paid', 'not_paid'], 
    default: 'not_paid' 
  },
  received_amount: { 
    type: Number, 
    default: 0 
  },
  customer_name: { type: String, required: false },
  service_type: { 
    type: String, 
    enum: ['dine_in', 'take_away'], 
    required: false 
  },
  notification: {
    type: String,
    enum: ['pending', 'confirmed', 'ready', 'picked', 'cancel'],
    default: 'pending'
  },
  notification_status: {
    type: Number,
    enum: [0, 1],
    default: 0
  }
}, { timestamps: true });

orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const prefix = `${day}${month}-RPOS-`;

      const lastOrder = await mongoose.model('Order').findOne({
        created_by: this.created_by,
        order_number: { $regex: `^${prefix}`, $options: 'i' }
      }).sort({ order_number: -1 }).select('order_number');

      let orderCount = 1;
      if (lastOrder && lastOrder.order_number) {
        const match = lastOrder.order_number.match(/(\d{3})$/);
        if (match) {
          orderCount = parseInt(match[1]) + 1;
        }
      }

      const paddedCount = String(orderCount).padStart(3, '0');
      this.order_number = `${prefix}${paddedCount}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

orderSchema.index({ order_number: 1, created_by: 1 }, { unique: true });

module.exports = mongoose.model('Order', orderSchema);