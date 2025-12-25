import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';

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
