// models/RequestLog.js
const mongoose = require('mongoose');

const requestLogSchema = new mongoose.Schema({
  name: { type: String, unique: true }, // We'll just use a single entry with a fixed name
  lastRequestDate: Date,
});

module.exports = mongoose.model('RequestLog', requestLogSchema);
