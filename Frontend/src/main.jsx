import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

// Use local backend for development, production URL for production
const API_URL = import.meta.env.PROD 
  ? 'https://rentflow-backend-ad3t.onrender.com' 
  : 'http://localhost:5000';

axios.defaults.baseURL = API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);