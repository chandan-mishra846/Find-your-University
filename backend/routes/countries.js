const express = require('express');
const router = express.Router();
const UniversityController = require('../controllers/UniversityController');

// GET /api/countries - Get all unique countries
router.get('/', UniversityController.getCountries);

module.exports = router;
