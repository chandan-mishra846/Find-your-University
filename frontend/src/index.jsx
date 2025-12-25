import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { API_BASE_URL } from './utils/apiClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log frontend and API URLs on startup
if (typeof window !== 'undefined') {
  const frontendURL = window.location.origin;
  // eslint-disable-next-line no-console
  console.log(`[Frontend] Running at: ${frontendURL}`);
  // eslint-disable-next-line no-console
  console.log(`[Frontend] API base: ${API_BASE_URL}`);
}
