import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const loadUser = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  useEffect(() => {
    const handleStorageChange = () => loadUser();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    showToast('Logged out successfully!', 'success');
    navigate('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>🚗 RentFlow</Link>

        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>🏠 Home</Link>
        <Link to="/cars" onClick={closeMenu}>🚗 Browse Cars</Link>

        {user ? (
          <>
            <Link to="/dashboard" onClick={closeMenu}>📊 Dashboard</Link>
            {user.role === 'admin' && (
              <>
                <Link to="/admin" onClick={closeMenu}>⚙️ Admin Dashboard</Link>
                <Link to="/admin/bookings" onClick={closeMenu}>📋 Bookings</Link>
                <Link to="/admin/users" onClick={closeMenu}>👥 Users</Link>
                <Link to="/admin/drivers" onClick={closeMenu}>👨‍✈️ Drivers</Link>
                <Link to="/admin/invoices" onClick={closeMenu}>📄 Invoices</Link>
                <Link to="/admin/payments" onClick={closeMenu}>💳 Payments</Link>
                <Link to="/admin/reminders" onClick={closeMenu}>⏰ Reminders</Link>
              </>
            )}
            <button onClick={handleLogout} className="dropdown-logout">🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>🔐 Login</Link>
            <Link to="/register" onClick={closeMenu}>📝 Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;