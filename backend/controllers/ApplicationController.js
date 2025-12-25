const ApplicationModel = require('../models/ApplicationModel');
const UniversityModel = require('../models/UniversityModel');
const { validateApplicationData } = require('../utils/validation');
const { handleError, AppError } = require('../utils/errorHandler');

class ApplicationController {
  // Submit new application
  static async submitApplication(req, res) {
    try {
      const {
        university_id,
        program_id,
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        nationality,
        gpa,
        ielts_score
      } = req.body;

      // Validate input data
      const validation = validateApplicationData({
        first_name,
        last_name,
        email,
        gpa,
        ielts_score
      });

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        });
      }

      // Get program requirements
      const program = await UniversityModel.getProgramById(program_id);

      if (!program) {
        return res.status(404).json({
          success: false,
          error: 'Program not found'
        });
      }

      // Check eligibility - both GPA and IELTS must meet minimum requirements
      if (parseFloat(gpa) < program.min_gpa || parseFloat(ielts_score) < program.min_ielts) {
        return res.status(400).json({
          success: false,
          error: 'Not eligible',
          message: `Your GPA (${gpa}) or IELTS score (${ielts_score}) does not meet the minimum requirements (GPA: ${program.min_gpa}, IELTS: ${program.min_ielts}) for ${program.program_name}.`,
          eligible: false
        });
      }

      // Create application
      const application = await ApplicationModel.createApplication({
        university_id,
        program_id,
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        nationality,
        gpa,
        ielts_score
      });

      return res.status(201).json({
        success: true,
        application_id: application.id,
        message: 'Application submitted successfully!'
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  // Get application by ID
  static async getApplication(req, res) {
    try {
      const { id } = req.params;
      const application = await ApplicationModel.getApplicationById(id);

      if (!application) {
        return res.status(404).json({
          success: false,
          error: 'Application not found'
        });
      }

      return res.json({
        success: true,
        application
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  // Get all applications (admin)
  static async getAllApplications(req, res) {
    try {
      const { status, university_id } = req.query;
      const applications = await ApplicationModel.getAllApplications({
        status,
        university_id
      });

      return res.json({
        success: true,
        count: applications.length,
        applications
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  // Update application status
  static async updateApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status. Must be pending, approved, or rejected'
        });
      }

      const application = await ApplicationModel.updateApplicationStatus(id, status);

      if (!application) {
        return res.status(404).json({
          success: false,
          error: 'Application not found'
        });
      }

      return res.json({
        success: true,
        message: 'Application status updated',
        application
      });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = ApplicationController;
