// models/District.js
const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('District', districtSchema);
