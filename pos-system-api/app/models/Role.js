const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }, // Added description field
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Ensure uniqueness per admin (name + created_by)
RoleSchema.index({ name: 1, created_by: 1 }, { unique: true });
module.exports = mongoose.model('Role', RoleSchema);