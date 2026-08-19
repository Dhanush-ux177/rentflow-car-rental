// Frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated API call to use the live Render backend URL
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      showToast('Login successful!', 'success');
      navigate('/cars');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    // Full-width light gray background
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      
      {/* White login card */}
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 font-medium mb-6">Sign in to your RentFlow account</p>
        
        {/* Error message */}
        {error && <p className="text-red-500 text-center font-bold mb-4">{error}</p>}
        
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="user@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#0056D2] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
        
        {/* Register Link */}
        <div className="text-center mt-6 font-medium">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-[#0056D2] hover:underline font-bold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;