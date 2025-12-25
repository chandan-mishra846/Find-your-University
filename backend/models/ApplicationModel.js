const pool = require('../db');

class ApplicationModel {
  // Submit a new application
  static async createApplication(data) {
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
      } = data;

      const query = `
        INSERT INTO applications (
          university_id, program_id, first_name, last_name, email, 
          phone, date_of_birth, nationality, gpa, ielts_score
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `;

      const values = [
        university_id,
        program_id,
        first_name,
        last_name,
        email,
        phone || null,
        date_of_birth || null,
        nationality || null,
        gpa,
        ielts_score
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get application by ID
  static async getApplicationById(applicationId) {
    try {
      const query = `
        SELECT * FROM applications WHERE id = $1
      `;
      const result = await pool.query(query, [applicationId]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Get all applications (for admin)
  static async getAllApplications(filters = {}) {
    try {
      const { status, university_id } = filters;

      let query = `SELECT * FROM applications WHERE 1=1`;
      const params = [];
      let paramCount = 1;

      if (status) {
        query += ` AND status = $${paramCount}`;
        params.push(status);
        paramCount++;
      }

      if (university_id) {
        query += ` AND university_id = $${paramCount}`;
        params.push(university_id);
        paramCount++;
      }

      query += ` ORDER BY applied_at DESC`;

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Update application status
  static async updateApplicationStatus(applicationId, status) {
    try {
      const query = `
        UPDATE applications 
        SET status = $1 
        WHERE id = $2 
        RETURNING *
      `;
      const result = await pool.query(query, [status, applicationId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ApplicationModel;
