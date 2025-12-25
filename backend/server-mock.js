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
    id: 10, name: 'Technical University of Munich', country: 'Germany', city: 'Munich',
    program_id: 28, program_name: 'Computer Engineering', degree_level: "Bachelor's",
    tuition_fee: 0, duration_years: 3.5, min_gpa: 3.20, min_ielts: 6.0, application_fee: 75, ranking: 28
  },
  // Added broader coverage: US, UK, Canada, Australia, Germany, Switzerland, Singapore, India, Japan, Netherlands, France, China, UAE, Sweden, Norway, Ireland, New Zealand, Spain, Italy
  { id: 8, name: 'Princeton University', country: 'United States', city: 'Princeton', program_id: 29, program_name: 'Computer Science', degree_level: "Bachelor's", tuition_fee: 56000, duration_years: 4, min_gpa: 3.75, min_ielts: 7.0, application_fee: 75, ranking: 8 },
  { id: 9, name: 'UC Berkeley', country: 'United States', city: 'Berkeley', program_id: 30, program_name: 'Electrical Engineering', degree_level: "Bachelor's", tuition_fee: 44000, duration_years: 4, min_gpa: 3.70, min_ielts: 7.0, application_fee: 80, ranking: 10 },
  { id: 11, name: 'Imperial College London', country: 'United Kingdom', city: 'London', program_id: 31, program_name: 'Data Science', degree_level: "Master's", tuition_fee: 36000, duration_years: 1, min_gpa: 3.50, min_ielts: 6.5, application_fee: 100, ranking: 6 },
  { id: 12, name: 'University of Melbourne', country: 'Australia', city: 'Melbourne', program_id: 32, program_name: 'Engineering', degree_level: "Bachelor's", tuition_fee: 32000, duration_years: 3, min_gpa: 3.20, min_ielts: 6.5, application_fee: 110, ranking: 33 },
  { id: 13, name: 'Australian National University', country: 'Australia', city: 'Canberra', program_id: 33, program_name: 'Computer Science', degree_level: 'PhD', tuition_fee: 0, duration_years: 3.5, min_gpa: 3.50, min_ielts: 7.0, application_fee: 120, ranking: 34 },
  { id: 14, name: 'University of Tokyo', country: 'Japan', city: 'Tokyo', program_id: 34, program_name: 'Mechanical Engineering', degree_level: "Master's", tuition_fee: 12000, duration_years: 2, min_gpa: 3.20, min_ielts: 6.0, application_fee: 60, ranking: 28 },
  { id: 15, name: 'National University of Singapore', country: 'Singapore', city: 'Singapore', program_id: 35, program_name: 'Computer Science', degree_level: "Bachelor's", tuition_fee: 15000, duration_years: 4, min_gpa: 3.40, min_ielts: 6.5, application_fee: 50, ranking: 11 },
  { id: 16, name: 'EPFL', country: 'Switzerland', city: 'Lausanne', program_id: 36, program_name: 'Physics', degree_level: 'PhD', tuition_fee: 0, duration_years: 4, min_gpa: 3.60, min_ielts: 6.5, application_fee: 100, ranking: 14 },
  { id: 17, name: 'TU Delft', country: 'Netherlands', city: 'Delft', program_id: 37, program_name: 'Aerospace Engineering', degree_level: "Master's", tuition_fee: 18500, duration_years: 2, min_gpa: 3.30, min_ielts: 6.5, application_fee: 100, ranking: 52 },
  { id: 18, name: 'IIT Bombay', country: 'India', city: 'Mumbai', program_id: 38, program_name: 'Electrical Engineering', degree_level: "Bachelor's", tuition_fee: 2500, duration_years: 4, min_gpa: 3.20, min_ielts: 6.0, application_fee: 25, ranking: 149 },
  { id: 19, name: 'Tsinghua University', country: 'China', city: 'Beijing', program_id: 39, program_name: 'Artificial Intelligence', degree_level: "Master's", tuition_fee: 12000, duration_years: 2, min_gpa: 3.40, min_ielts: 6.5, application_fee: 90, ranking: 25 },
  { id: 20, name: 'Sorbonne University', country: 'France', city: 'Paris', program_id: 40, program_name: 'Mathematics', degree_level: "Master's", tuition_fee: 5000, duration_years: 2, min_gpa: 3.20, min_ielts: 6.0, application_fee: 70, ranking: 44 },
  { id: 21, name: 'KTH Royal Institute of Technology', country: 'Sweden', city: 'Stockholm', program_id: 41, program_name: 'Software Engineering', degree_level: "Master's", tuition_fee: 15500, duration_years: 2, min_gpa: 3.20, min_ielts: 6.5, application_fee: 100, ranking: 98 },
  { id: 22, name: 'NTNU', country: 'Norway', city: 'Trondheim', program_id: 42, program_name: 'Marine Technology', degree_level: 'PhD', tuition_fee: 0, duration_years: 4, min_gpa: 3.30, min_ielts: 6.5, application_fee: 0, ranking: 120 },
  { id: 23, name: 'Trinity College Dublin', country: 'Ireland', city: 'Dublin', program_id: 43, program_name: 'Business Studies', degree_level: "Bachelor's", tuition_fee: 22500, duration_years: 4, min_gpa: 3.20, min_ielts: 6.5, application_fee: 50, ranking: 81 },
  { id: 24, name: 'University of Auckland', country: 'New Zealand', city: 'Auckland', program_id: 44, program_name: 'Data Science', degree_level: "Bachelor's", tuition_fee: 28500, duration_years: 3, min_gpa: 3.20, min_ielts: 6.5, application_fee: 85, ranking: 68 },
  { id: 25, name: 'University of Barcelona', country: 'Spain', city: 'Barcelona', program_id: 45, program_name: 'Biology', degree_level: "Master's", tuition_fee: 4500, duration_years: 2, min_gpa: 3.00, min_ielts: 6.0, application_fee: 50, ranking: 150 },
  { id: 26, name: 'Politecnico di Milano', country: 'Italy', city: 'Milan', program_id: 46, program_name: 'Architecture', degree_level: "Master's", tuition_fee: 3900, duration_years: 2, min_gpa: 3.20, min_ielts: 6.0, application_fee: 60, ranking: 123 },
  { id: 27, name: 'McGill University', country: 'Canada', city: 'Montreal', program_id: 47, program_name: 'Finance', degree_level: "Master's", tuition_fee: 24000, duration_years: 2, min_gpa: 3.30, min_ielts: 6.5, application_fee: 110, ranking: 27 },
  { id: 4, name: 'University of Cambridge', country: 'United Kingdom', city: 'Cambridge', program_id: 48, program_name: 'Physics', degree_level: 'PhD', tuition_fee: 0, duration_years: 3.5, min_gpa: 3.70, min_ielts: 7.0, application_fee: 75, ranking: 4 },
  { id: 27, name: 'UC San Diego', country: 'United States', city: 'San Diego', program_id: 49, program_name: 'Bioengineering', degree_level: 'PhD', tuition_fee: 0, duration_years: 5, min_gpa: 3.50, min_ielts: 7.0, application_fee: 120, ranking: 34 },
  { id: 28, name: 'Khalifa University', country: 'United Arab Emirates', city: 'Abu Dhabi', program_id: 50, program_name: 'Robotics', degree_level: "Master's", tuition_fee: 0, duration_years: 2, min_gpa: 3.20, min_ielts: 6.5, application_fee: 0, ranking: 181 },
  { id: 7, name: 'ETH Zurich', country: 'Switzerland', city: 'Zurich', program_id: 51, program_name: 'Computer Science', degree_level: "Master's", tuition_fee: 1500, duration_years: 2, min_gpa: 3.50, min_ielts: 6.5, application_fee: 100, ranking: 7 },
  { id: 6, name: 'University of Toronto', country: 'Canada', city: 'Toronto', program_id: 52, program_name: 'Computer Science', degree_level: 'PhD', tuition_fee: 0, duration_years: 5, min_gpa: 3.40, min_ielts: 7.0, application_fee: 120, ranking: 25 },
  { id: 5, name: 'MIT', country: 'United States', city: 'Cambridge', program_id: 53, program_name: 'Electrical Engineering', degree_level: 'PhD', tuition_fee: 0, duration_years: 5, min_gpa: 3.60, min_ielts: 7.0, application_fee: 75, ranking: 5 },
  { id: 1, name: 'Harvard University', country: 'United States', city: 'Cambridge', program_id: 54, program_name: 'Economics', degree_level: 'PhD', tuition_fee: 0, duration_years: 5, min_gpa: 3.60, min_ielts: 7.0, application_fee: 105, ranking: 1 },
];

const mockCountries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'Switzerland',
  'Singapore', 'Australia', 'India', 'Japan', 'Netherlands', 'France',
  'China', 'United Arab Emirates', 'Sweden', 'Norway', 'Ireland', 'New Zealand',
  'Spain', 'Italy'
];

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
  console.log(`📝 To use real database, check SETUP.md`);
});
