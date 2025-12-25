// API endpoints
export const API_ENDPOINTS = {
  UNIVERSITIES: '/universities',
  COUNTRIES: '/countries',
  APPLICATIONS: '/applications',
};

// Degree levels
export const DEGREE_LEVELS = [
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: 'PhD', label: 'PhD' },
];

// Comparison limit
export const MAX_COMPARISON_COUNT = 3;
export const MIN_COMPARISON_COUNT = 2;

// Filter defaults
export const DEFAULT_FILTERS = {
  country: 'all',
  degree_level: 'all',
  min_tuition: 0,
  max_tuition: 80000,
  gpa: '',
  ielts: '',
};

// Application statuses
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_GPA: 'GPA must be between 0 and 4.0',
  INVALID_IELTS: 'IELTS score must be between 0 and 9.0',
  NETWORK_ERROR: 'Network error. Please try again.',
  APPLICATION_FAILED: 'Failed to submit application. Please try again.',
  FETCH_UNIVERSITIES_FAILED: 'Failed to load universities. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  APPLICATION_SUBMITTED: 'Your application has been submitted successfully!',
};
