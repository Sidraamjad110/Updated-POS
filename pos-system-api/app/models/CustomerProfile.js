const mongoose = require("mongoose");

const customerProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  loyalty_points: { type: Number, default: 0 },
}, { timestamps: true });

const CustomerProfile = mongoose.model("CustomerProfile", customerProfileSchema);

module.exports = CustomerProfile;