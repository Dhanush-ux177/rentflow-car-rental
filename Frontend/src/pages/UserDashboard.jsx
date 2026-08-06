import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    const token = localStorage.getItem('token');
    if (token && userData.id) {
      axios.get(`/api/bookings/user/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/bookings/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      alert('Cancellation failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>
      <div className="user-info card">
        <h3>Welcome, {user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map(b => (
            <div key={b._id} className="booking-item card">
              <h4>{b.carId?.name || 'Car'}</h4>
              <p>Pickup: {new Date(b.pickupDate).toLocaleDateString()}</p>
              <p>Return: {new Date(b.returnDate).toLocaleDateString()}</p>
              <p>Total: ₹{b.totalCost}</p>
              <p>Status: <span className={`status ${b.status}`}>{b.status}</span></p>
              {b.status !== 'cancelled' && b.status !== 'completed' && (
                <button onClick={() => cancelBooking(b._id)} className="btn btn-danger">Cancel</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;