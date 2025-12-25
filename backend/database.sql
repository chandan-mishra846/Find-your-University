-- University Admission Platform Database Schema

-- Create universities table
CREATE TABLE IF NOT EXISTS universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    ranking INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create programs table (degree programs offered by universities)
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    degree_level VARCHAR(50) NOT NULL, -- Bachelor's, Master's, PhD
    program_name VARCHAR(255) NOT NULL,
    tuition_fee DECIMAL(10, 2) NOT NULL,
    duration_years DECIMAL(3, 1) NOT NULL,
    min_gpa DECIMAL(3, 2) NOT NULL,
    min_ielts DECIMAL(3, 1) NOT NULL,
    application_fee DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    date_of_birth DATE,
    nationality VARCHAR(100),
    gpa DECIMAL(3, 2) NOT NULL,
    ielts_score DECIMAL(3, 1) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample universities
INSERT INTO universities (name, country, city, description, ranking) VALUES
('Harvard University', 'United States', 'Cambridge', 'Prestigious Ivy League university with world-class programs', 1),
('Stanford University', 'United States', 'Stanford', 'Leading research university in Silicon Valley', 2),
('University of Oxford', 'United Kingdom', 'Oxford', 'Historic university with exceptional academic standards', 3),
('University of Cambridge', 'United Kingdom', 'Cambridge', 'Renowned for research and teaching excellence', 4),
('MIT', 'United States', 'Cambridge', 'World leader in science and technology education', 5),
('University of Toronto', 'Canada', 'Toronto', 'Top Canadian university with diverse programs', 25),
('ETH Zurich', 'Switzerland', 'Zurich', 'Premier university for science and technology', 7),
('National University of Singapore', 'Singapore', 'Singapore', 'Leading Asian university with global outlook', 8),
('University of Melbourne', 'Australia', 'Melbourne', 'Top Australian university with excellent research', 14),
('Technical University of Munich', 'Germany', 'Munich', 'Excellence in engineering and technology', 28),
('University of British Columbia', 'Canada', 'Vancouver', 'Beautiful campus with strong academics', 34),
('McGill University', 'Canada', 'Montreal', 'Historic university with international reputation', 31),
('London School of Economics', 'United Kingdom', 'London', 'Specialized in social sciences and economics', 45),
('University of Sydney', 'Australia', 'Sydney', 'Oldest university in Australia with great programs', 41),
('KU Leuven', 'Belgium', 'Leuven', 'Leading European research university', 48);

-- Insert sample programs for each university
-- Harvard University
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(1, 'Bachelor''s', 'Computer Science', 54269.00, 4.0, 3.80, 7.5, 75.00),
(1, 'Master''s', 'Business Administration (MBA)', 73440.00, 2.0, 3.60, 7.0, 250.00),
(1, 'PhD', 'Economics', 52456.00, 5.0, 3.70, 7.0, 105.00);

-- Stanford University
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(2, 'Bachelor''s', 'Engineering', 56169.00, 4.0, 3.75, 7.0, 90.00),
(2, 'Master''s', 'Computer Science', 57210.00, 2.0, 3.50, 6.5, 125.00),
(2, 'Master''s', 'Data Science', 55905.00, 2.0, 3.40, 6.5, 125.00);

-- University of Oxford
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(3, 'Bachelor''s', 'Law', 39010.00, 3.0, 3.85, 7.5, 75.00),
(3, 'Master''s', 'Philosophy', 33215.00, 1.0, 3.60, 7.5, 100.00),
(3, 'PhD', 'Medicine', 45760.00, 4.0, 3.70, 7.5, 150.00);

-- University of Cambridge
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(4, 'Bachelor''s', 'Mathematics', 38030.00, 3.0, 3.80, 7.5, 75.00),
(4, 'Master''s', 'Engineering', 39360.00, 1.0, 3.50, 7.0, 100.00),
(4, 'PhD', 'Physics', 35890.00, 3.5, 3.65, 7.0, 120.00);

-- MIT
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(5, 'Bachelor''s', 'Electrical Engineering', 55510.00, 4.0, 3.85, 7.0, 75.00),
(5, 'Master''s', 'Artificial Intelligence', 55878.00, 2.0, 3.70, 7.0, 110.00),
(5, 'PhD', 'Computer Science', 53790.00, 5.0, 3.75, 7.0, 105.00);

-- University of Toronto
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(6, 'Bachelor''s', 'Computer Science', 44020.00, 4.0, 3.30, 6.5, 85.00),
(6, 'Master''s', 'Business Analytics', 38450.00, 1.5, 3.20, 6.5, 120.00),
(6, 'Master''s', 'Public Health', 29870.00, 2.0, 3.00, 6.5, 95.00);

-- ETH Zurich
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(7, 'Bachelor''s', 'Mechanical Engineering', 1460.00, 3.0, 3.50, 7.0, 150.00),
(7, 'Master''s', 'Robotics', 1460.00, 1.5, 3.40, 6.5, 150.00),
(7, 'PhD', 'Materials Science', 1460.00, 4.0, 3.60, 6.5, 150.00);

-- National University of Singapore
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(8, 'Bachelor''s', 'Business Administration', 26350.00, 4.0, 3.40, 6.5, 50.00),
(8, 'Master''s', 'Information Systems', 28940.00, 1.5, 3.30, 6.5, 75.00),
(8, 'Master''s', 'Urban Planning', 25800.00, 2.0, 3.20, 6.0, 60.00);

-- University of Melbourne
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(9, 'Bachelor''s', 'Architecture', 42784.00, 3.0, 3.30, 6.5, 100.00),
(9, 'Master''s', 'Marketing', 46304.00, 1.5, 3.20, 6.5, 100.00),
(9, 'Master''s', 'Environmental Science', 39872.00, 2.0, 3.10, 6.5, 100.00);

-- Technical University of Munich
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(10, 'Bachelor''s', 'Computer Engineering', 0.00, 3.5, 3.20, 6.0, 75.00),
(10, 'Master''s', 'Automotive Engineering', 0.00, 2.0, 3.30, 6.5, 75.00),
(10, 'PhD', 'Electrical Engineering', 0.00, 4.0, 3.50, 6.5, 75.00);

-- University of British Columbia
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(11, 'Bachelor''s', 'Psychology', 40032.00, 4.0, 3.10, 6.5, 70.00),
(11, 'Master''s', 'Environmental Management', 32567.00, 2.0, 3.00, 6.5, 90.00),
(11, 'Master''s', 'Data Science', 38920.00, 1.5, 3.30, 6.5, 100.00);

-- McGill University
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(12, 'Bachelor''s', 'Biology', 20020.00, 4.0, 3.30, 6.5, 85.00),
(12, 'Master''s', 'Economics', 18450.00, 2.0, 3.20, 6.5, 100.00),
(12, 'PhD', 'Neuroscience', 22340.00, 5.0, 3.50, 7.0, 110.00);

-- London School of Economics
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(13, 'Bachelor''s', 'Economics', 24240.00, 3.0, 3.60, 7.0, 80.00),
(13, 'Master''s', 'Finance', 34200.00, 1.0, 3.50, 7.0, 100.00),
(13, 'Master''s', 'International Relations', 28920.00, 1.0, 3.40, 7.0, 90.00);

-- University of Sydney
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(14, 'Bachelor''s', 'Medicine', 74880.00, 5.0, 3.70, 7.0, 150.00),
(14, 'Master''s', 'Engineering Management', 49000.00, 1.5, 3.20, 6.5, 100.00),
(14, 'Master''s', 'Education', 38520.00, 1.5, 3.00, 6.5, 80.00);

-- KU Leuven
INSERT INTO programs (university_id, degree_level, program_name, tuition_fee, duration_years, min_gpa, min_ielts, application_fee) VALUES
(15, 'Bachelor''s', 'International Business', 12000.00, 3.0, 3.20, 6.5, 60.00),
(15, 'Master''s', 'Biomedical Sciences', 10000.00, 2.0, 3.30, 6.5, 60.00),
(15, 'Master''s', 'Artificial Intelligence', 8500.00, 1.0, 3.40, 6.5, 60.00);

-- Create indexes for better query performance
CREATE INDEX idx_programs_university ON programs(university_id);
CREATE INDEX idx_programs_degree_level ON programs(degree_level);
CREATE INDEX idx_programs_tuition ON programs(tuition_fee);
CREATE INDEX idx_universities_country ON universities(country);
CREATE INDEX idx_applications_status ON applications(status);
