const express = require('express');
const router = express.Router();
const districtController = require('../controllers/DistrictController');

// Route to fetch all districts
router.get('/all', districtController.getAllDistricts);

// Route to create a new district
router.post('/add', districtController.createDistrict);

module.exports = router;
