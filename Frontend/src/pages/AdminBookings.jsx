import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/bookings/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh the list
      fetchBookings();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="dashboard">
      <h1>All Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map(b => (
            <div key={b._id} className="booking-item card">
              <div>
                <h4>{b.carId?.name || 'Unknown Car'}</h4>
                <p><strong>Customer:</strong> {b.userId?.name || 'Unknown'} ({b.userId?.email})</p>
                <p><strong>Pickup:</strong> {new Date(b.pickupDate).toLocaleDateString()}</p>
                <p><strong>Return:</strong> {new Date(b.returnDate).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ₹{b.totalCost}</p>
                <p><strong>Rental Type:</strong> {b.rentalType === 'with-driver' ? 'With Driver' : 'Self Drive'}</p>
                {b.driverId && <p><strong>Driver:</strong> {b.driverId.name}</p>}
              </div>
              <div>
                <p><strong>Status:</strong></p>
                <select 
                  value={b.status} 
                  onChange={(e) => updateStatus(b._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookings;