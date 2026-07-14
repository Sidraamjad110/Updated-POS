const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pictureUrl: { type: String, optional: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { 
      type: String, 
      enum: ['active', 'deactive'], 
      default: 'active',
      optional: true 
    },
    time_required: { 
      type: Number, 
      required: true, 
      min: 0, 
      default: 0,
      description: "Time required to prepare the product in minutes"
    },
  },
  { timestamps: true }
);

// Unique product name per admin
productSchema.index({ name: 1, created_by: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);