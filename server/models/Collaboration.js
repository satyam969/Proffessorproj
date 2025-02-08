const mongoose = require('mongoose');

const CollaborationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  projectTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collaboration', CollaborationSchema);
