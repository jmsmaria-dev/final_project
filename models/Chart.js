const mongoose = require('mongoose');

const DataPointSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true }
}, { _id: false });

const ChartSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'summary', 'reports'
  title: { type: String, required: true },
  description: { type: String },
  datasetLabel: { type: String, default: 'Value' },
  data: [DataPointSchema]
}, { timestamps: true });

module.exports = mongoose.model('Chart', ChartSchema);
