const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_type: { type: String, required: true, enum: ["isadmin", "worker", "customer"] },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    logoUrl: { type: String, optional: true },
    store_name: { type: String },
    store_logo: { type: String, optional: true },
    theme: { type: String, optional: true, enum: ["light", "dark", "blue", "green"], default: "light" },
    status: { type: Number, enum: [0, 1], default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);