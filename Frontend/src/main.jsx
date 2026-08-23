import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

// Use relative URLs – no baseURL needed (same origin)
axios.defaults.baseURL =  import.meta.env.VITE_API_URL || 'https://rentflow-car-rental-2.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);