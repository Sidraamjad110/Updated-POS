const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });


categorySchema.index({ name: 1, created_by: 1 }, { unique: true });
module.exports = mongoose.model('Category', categorySchema);
