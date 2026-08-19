// Frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', address: '', licenseNumber: '', cnic: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated to use your live Render backend URL
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      showToast('Registration successful! Please login.', 'success');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    // Full-width light gray background with flex centering
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      
      {/* White register card - max-w-lg accommodates extra fields */}
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Join RentFlow</h2>
        <p className="text-center text-gray-500 font-medium mb-6">Create your account and start driving</p>
        
        {/* Error message */}
        {error && <p className="text-red-500 text-center font-bold mb-4">{error}</p>}
        
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              placeholder="user@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              minLength="6"
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              placeholder="+91 98765 43210"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              placeholder="123 Main St, City"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">License Number</label>
            <input 
              type="text" 
              name="licenseNumber" 
              value={form.licenseNumber} 
              onChange={handleChange} 
              placeholder="DL-123456"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">CNIC</label>
            <input 
              type="text" 
              name="cnic" 
              value={form.cnic} 
              onChange={handleChange} 
              placeholder="12345-1234567-1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50 transition"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#0056D2] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg mt-2"
          >
            Create Account
          </button>
        </form>
        
        {/* Login Link */}
        <div className="text-center mt-6 font-medium">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-[#0056D2] hover:underline font-bold">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;