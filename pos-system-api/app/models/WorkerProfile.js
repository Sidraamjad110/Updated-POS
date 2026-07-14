// models/WorkerProfile.js
const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  job_title: { type: String },
  shift_time: { type: String },
  salary: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('WorkerProfile', workerProfileSchema);
