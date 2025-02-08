const mongoose = require('mongoose');

const TeachingSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Teaching', TeachingSchema);
