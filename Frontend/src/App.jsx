import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Drivers from './pages/Drivers';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Reminders from './pages/Reminders';
import AdminBookings from './pages/AdminBookings';
import AdminUsers from './pages/AdminUsers';
import { ToastProvider } from './context/ToastContext';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastProvider>
      {showSplash && (
        <div className="splash-screen">
          <div className="splash-content">
            <div className="splash-icon">🚗</div>
            <h1 className="splash-title">RentFlow</h1>
            <p className="splash-subtitle">Drive Your Dream</p>
            <div className="splash-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div className={`app-wrapper ${showSplash ? 'hidden' : ''}`}>
        <Router>
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
              <Route path="/cars/:id" element={<ProtectedRoute><CarDetails /></ProtectedRoute>} />
              <Route path="/booking/:carId" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/drivers" element={<ProtectedRoute adminOnly><Drivers /></ProtectedRoute>} />
              <Route path="/admin/invoices" element={<ProtectedRoute adminOnly><Invoices /></ProtectedRoute>} />
              <Route path="/admin/payments" element={<ProtectedRoute adminOnly><Payments /></ProtectedRoute>} />
              <Route path="/admin/reminders" element={<ProtectedRoute adminOnly><Reminders /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </ToastProvider>
  );
}

export default App;