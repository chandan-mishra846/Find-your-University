const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');

// POST /api/applications - Submit a new application
router.post('/', ApplicationController.submitApplication);

// GET /api/applications/:id - Get application by ID
router.get('/:id', ApplicationController.getApplication);

// GET /api/applications - Get all applications (admin)
router.get('/', ApplicationController.getAllApplications);

// PATCH /api/applications/:id - Update application status
router.patch('/:id', ApplicationController.updateApplicationStatus);

module.exports = router;
