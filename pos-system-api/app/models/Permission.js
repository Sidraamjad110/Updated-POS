const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  description: { type: String, required: false }, // Added description field
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Make compound index for admin-level uniqueness
PermissionSchema.index({ key: 1, created_by: 1 }, { unique: true });

module.exports = mongoose.model("Permission", PermissionSchema);