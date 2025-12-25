import axios from 'axios';

// Resolve API base with fallbacks for Vercel preview/prod
const resolveApiBase = () => {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://find-your-university-ymac.onrender.com/api';
  }
  return '/api';
};

const API_BASE_URL = resolveApiBase();

export { API_BASE_URL };

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// University API calls
export const universityAPI = {
  getUniversities: (filters) => {
    const params = new URLSearchParams();
    if (filters.country && filters.country !== 'all') params.append('country', filters.country);
    if (filters.degree_level && filters.degree_level !== 'all') params.append('degree_level', filters.degree_level);
    if (filters.max_tuition) params.append('max_tuition', filters.max_tuition);
    return apiClient.get(`/universities?${params.toString()}`);
  },
  
  getCountries: () => apiClient.get('/countries'),
};

// Application API calls
export const applicationAPI = {
  submitApplication: (applicationData) => 
    apiClient.post('/applications', applicationData),
  
  getApplication: (id) => 
    apiClient.get(`/applications/${id}`),
  
  getAllApplications: () => 
    apiClient.get('/applications'),
  
  updateApplicationStatus: (id, status) => 
    apiClient.patch(`/applications/${id}`, { status }),
};
