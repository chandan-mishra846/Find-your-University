const pool = require('../db');

class UniversityModel {
  // Get all universities with filters
  static async getUniversities(filters = {}) {
    try {
      const { country, degree_level, min_tuition, max_tuition } = filters;

      let query = `
        SELECT 
          u.id, u.name, u.country, u.city, u.description, u.ranking,
          p.id as program_id, p.degree_level, p.program_name, 
          p.tuition_fee, p.duration_years, p.min_gpa, p.min_ielts, p.application_fee
        FROM universities u
        INNER JOIN programs p ON u.id = p.university_id
        WHERE 1=1
      `;

      const params = [];
      let paramCount = 1;

      if (country && country !== 'all') {
        query += ` AND u.country = $${paramCount}`;
        params.push(country);
        paramCount++;
      }

      if (degree_level && degree_level !== 'all') {
        query += ` AND p.degree_level = $${paramCount}`;
        params.push(degree_level);
        paramCount++;
      }

      if (min_tuition) {
        query += ` AND p.tuition_fee >= $${paramCount}`;
        params.push(parseFloat(min_tuition));
        paramCount++;
      }

      if (max_tuition) {
        query += ` AND p.tuition_fee <= $${paramCount}`;
        params.push(parseFloat(max_tuition));
        paramCount++;
      }

      query += ' ORDER BY u.ranking ASC, p.tuition_fee ASC';

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all distinct countries
  static async getCountries() {
    try {
      const query = `
        SELECT DISTINCT country 
        FROM universities 
        ORDER BY country ASC
      `;
      const result = await pool.query(query);
      return result.rows.map(row => row.country);
    } catch (error) {
      throw error;
    }
  }

  // Get program details by ID
  static async getProgramById(programId) {
    try {
      const query = `
        SELECT min_gpa, min_ielts, program_name
        FROM programs
        WHERE id = $1
      `;
      const result = await pool.query(query, [programId]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UniversityModel;
