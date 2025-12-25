// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateGPA = (gpa) => {
  const gpaf = parseFloat(gpa);
  return gpaf >= 0 && gpaf <= 10;
};

const validateIELTS = (ielts) => {
  const ieltss = parseFloat(ielts);
  return ieltss >= 0 && ieltss <= 9;
};

const validateApplicationData = (data) => {
  const errors = [];

  // Required fields
  if (!data.first_name || data.first_name.trim() === '') {
    errors.push('First name is required');
  }

  if (!data.last_name || data.last_name.trim() === '') {
    errors.push('Last name is required');
  }

  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.gpa) {
    errors.push('CGPA is required');
  } else if (!validateGPA(data.gpa)) {
    errors.push('CGPA must be between 0 and 10');
  }

  if (!data.ielts_score) {
    errors.push('IELTS score is required');
  } else if (!validateIELTS(data.ielts_score)) {
    errors.push('IELTS score must be between 0 and 9');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validateGPA,
  validateIELTS,
  validateApplicationData
};
