const UniversityModel = require('../models/UniversityModel');
const { handleError } = require('../utils/errorHandler');

class UniversityController {
  // Get universities with filters
  static async getUniversities(req, res) {
    try {
      const { country, degree_level, min_tuition, max_tuition, gpa, ielts } = req.query;

      // Get filtered universities from model
      const universities = await UniversityModel.getUniversities({
        country,
        degree_level,
        min_tuition,
        max_tuition
      });

      // Add eligibility check to each university
      const universitiesWithEligibility = universities.map(uni => ({
        ...uni,
        eligible: gpa && ielts 
          ? parseFloat(gpa) >= uni.min_gpa && parseFloat(ielts) >= uni.min_ielts
          : true
      }));

      return res.json({
        success: true,
        universities: universitiesWithEligibility
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  // Get all countries
  static async getCountries(req, res) {
    try {
      const countries = await UniversityModel.getCountries();
      return res.json({
        success: true,
        countries
      });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = UniversityController;
