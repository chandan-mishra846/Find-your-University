const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for testing without database
const mockUniversities = [
  {
    id: 1, name: 'Harvard University', country: 'United States', city: 'Cambridge',
    program_id: 1, program_name: 'Computer Science', degree_level: "Bachelor's",
    tuition_fee: 54269, duration_years: 4, min_gpa: 3.80, min_ielts: 7.5, application_fee: 75, ranking: 1
  },
  {
    id: 2, name: 'Stanford University', country: 'United States', city: 'Stanford',
    program_id: 4, program_name: 'Engineering', degree_level: "Bachelor's",
    tuition_fee: 56169, duration_years: 4, min_gpa: 3.75, min_ielts: 7.0, application_fee: 90, ranking: 2
  },
  {
    id: 3, name: 'University of Oxford', country: 'United Kingdom', city: 'Oxford',
    program_id: 7, program_name: 'Law', degree_level: "Bachelor's",
    tuition_fee: 39010, duration_years: 3, min_gpa: 3.85, min_ielts: 7.5, application_fee: 75, ranking: 3
  },
  {
    id: 4, name: 'University of Cambridge', country: 'United Kingdom', city: 'Cambridge',
    program_id: 10, program_name: 'Mathematics', degree_level: "Bachelor's",
    tuition_fee: 38030, duration_years: 3, min_gpa: 3.80, min_ielts: 7.5, application_fee: 75, ranking: 4
  },
  {
    id: 5, name: 'MIT', country: 'United States', city: 'Cambridge',
    program_id: 13, program_name: 'Electrical Engineering', degree_level: "Bachelor's",
    tuition_fee: 55510, duration_years: 4, min_gpa: 3.85, min_ielts: 7.0, application_fee: 75, ranking: 5
  },
  {
    id: 6, name: 'University of Toronto', country: 'Canada', city: 'Toronto',
    program_id: 16, program_name: 'Computer Science', degree_level: "Bachelor's",
    tuition_fee: 44020, duration_years: 4, min_gpa: 3.30, min_ielts: 6.5, application_fee: 85, ranking: 25
  },
  {
    id: 1, name: 'Harvard University', country: 'United States', city: 'Cambridge',
    program_id: 2, program_name: 'Business Administration (MBA)', degree_level: "Master's",
    tuition_fee: 73440, duration_years: 2, min_gpa: 3.60, min_ielts: 7.0, application_fee: 250, ranking: 1
  },
  {
    id: 2, name: 'Stanford University', country: 'United States', city: 'Stanford',
    program_id: 5, program_name: 'Computer Science', degree_level: "Master's",
    tuition_fee: 57210, duration_years: 2, min_gpa: 3.50, min_ielts: 6.5, application_fee: 125, ranking: 2
  },
  {
    id: 6, name: 'University of Toronto', country: 'Canada', city: 'Toronto',
    program_id: 17, program_name: 'Business Analytics', degree_level: "Master's",
    tuition_fee: 38450, duration_years: 1.5, min_gpa: 3.20, min_ielts: 6.5, application_fee: 120, ranking: 25
  },
  {
    id: 7, name: 'ETH Zurich', country: 'Switzerland', city: 'Zurich',
    program_id: 19, program_name: 'Physics', degree_level: "Bachelor's",
    tuition_fee: 15000, duration_years: 3, min_gpa: 3.70, min_ielts: 6.5, application_fee: 100, ranking: 7
  },
];

const mockCountries = ['United States', 'United Kingdom', 'Canada', 'Switzerland', 'Japan', 'Germany', 'Australia'];

// Mock Routes
app.get('/api/universities', (req, res) => {
  const { country, degree_level, min_tuition, max_tuition, gpa, ielts } = req.query;
  
  let filtered = [...mockUniversities];
  
  if (country && country !== 'all') {
    filtered = filtered.filter(u => u.country === country);
  }
  
  if (degree_level && degree_level !== 'all') {
    filtered = filtered.filter(u => u.degree_level === degree_level);
  }
  
  if (min_tuition) {
    filtered = filtered.filter(u => u.tuition_fee >= parseFloat(min_tuition));
  }
  
  if (max_tuition) {
    filtered = filtered.filter(u => u.tuition_fee <= parseFloat(max_tuition));
  }
  
  // Add eligibility
  const universities = filtered.map(u => ({
    ...u,
    eligible: gpa && ielts 
      ? parseFloat(gpa) >= u.min_gpa && parseFloat(ielts) >= u.min_ielts
      : true
  }));
  
  res.json({ universities });
});

app.get('/api/countries', (req, res) => {
  res.json({ countries: mockCountries });
});

app.post('/api/applications', (req, res) => {
  const { university_id, program_id, gpa, ielts_score, first_name, last_name, email } = req.body;
  
  if (!university_id || !program_id || !first_name || !last_name || !email || !gpa || !ielts_score) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Find the program
  const university = mockUniversities.find(u => u.program_id === program_id);
  
  if (!university) {
    return res.status(404).json({ error: 'Program not found' });
  }
  
  // Check eligibility
  if (gpa < university.min_gpa || ielts_score < university.min_ielts) {
    return res.status(400).json({ 
      error: 'Not eligible',
      message: `Your GPA (${gpa}) or IELTS score (${ielts_score}) does not meet the minimum requirements (GPA: ${university.min_gpa}, IELTS: ${university.min_ielts}) for ${university.program_name}.`,
      eligible: false
    });
  }
  
  // Mock successful submission
  res.json({
    success: true,
    application_id: Math.floor(Math.random() * 1000),
    message: 'Application submitted successfully!'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running (MOCK DATA MODE)' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`⚠️  USING MOCK DATA - No database required!`);
});
