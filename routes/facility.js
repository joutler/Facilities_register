// routes/facilityRoutes.js
const express = require('express');
const { addFacility,getAllFacilities,getFacilityById } = require('../controllers/FacilityController');

const router = express.Router();

router.post('/add', addFacility);
router.get('/all', getAllFacilities);
router.get('/facilities/:id', getFacilityById);
module.exports = router;
