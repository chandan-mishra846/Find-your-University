// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// GPA validation (0-4.0 scale)
export const validateGPA = (gpa) => {
  const gpaNum = parseFloat(gpa);
  return !isNaN(gpaNum) && gpaNum >= 0 && gpaNum <= 4.0;
};

// IELTS validation (0-9.0 scale)
export const validateIELTS = (ielts) => {
  const ieltsNum = parseFloat(ielts);
  return !isNaN(ieltsNum) && ieltsNum >= 0 && ieltsNum <= 9.0;
};

// Phone validation (basic)
export const validatePhone = (phone) => {
  return phone.length >= 10 && phone.length <= 15;
};

// Complete application validation
export const validateApplicationData = (data) => {
  const errors = [];

  if (!data.first_name?.trim()) errors.push('First name is required');
  if (!data.last_name?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (data.email && !validateEmail(data.email)) errors.push('Email is invalid');
  if (data.phone && !validatePhone(data.phone)) errors.push('Phone number must be 10-15 digits');
  if (!data.gpa) errors.push('GPA is required');
  if (data.gpa && !validateGPA(data.gpa)) errors.push('GPA must be between 0 and 4.0');
  if (!data.ielts_score) errors.push('IELTS score is required');
  if (data.ielts_score && !validateIELTS(data.ielts_score)) errors.push('IELTS score must be between 0 and 9.0');

  return {
    isValid: errors.length === 0,
    errors,
  };
};
