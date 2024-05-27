// models/Facility.js
const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  facility_code: {
    type: String,
    unique: true,
    required: true,
  },
  facility_name: {
    type: String,
    required: true,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
});

module.exports = mongoose.model('Facility', facilitySchema);
