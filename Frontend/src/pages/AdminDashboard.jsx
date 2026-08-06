import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="dashboard admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card card"><h3>Total Cars</h3><p>{stats.totalCars}</p></div>
        <div className="stat-card card"><h3>Available Cars</h3><p>{stats.availableCars}</p></div>
        <div className="stat-card card"><h3>Total Bookings</h3><p>{stats.totalBookings}</p></div>
        <div className="stat-card card"><h3>Completed</h3><p>{stats.completedBookings}</p></div>
        <div className="stat-card card"><h3>Revenue</h3><p>₹{stats.totalRevenue}</p></div>
        <div className="stat-card card"><h3>Customers</h3><p>{stats.totalCustomers}</p></div>
        <div className="stat-card card"><h3>Total Drivers</h3><p>{stats.totalDrivers}</p></div>
        <div className="stat-card card"><h3>Available Drivers</h3><p>{stats.availableDrivers}</p></div>
      </div>

      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/admin/drivers" className="action-card card">
            <span>👨‍✈️</span>
            <p>Manage Drivers</p>
          </Link>
          <Link to="/admin/invoices" className="action-card card">
            <span>📄</span>
            <p>Invoices</p>
          </Link>
          <Link to="/admin/payments" className="action-card card">
            <span>💳</span>
            <p>Payments</p>
          </Link>
          <Link to="/admin/reminders" className="action-card card">
            <span>⏰</span>
            <p>Reminders</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;