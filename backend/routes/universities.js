const express = require('express');
const router = express.Router();
const UniversityController = require('../controllers/UniversityController');

// GET /api/universities - Get universities with filters
router.get('/', UniversityController.getUniversities);

module.exports = router;
