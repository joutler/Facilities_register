const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.post('/create', registrationController.handleNewUser);

router.get('/owners',registrationController.getAllOwners);
module.exports = router;