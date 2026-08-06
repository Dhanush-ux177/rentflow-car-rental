import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Payments() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    bookingId: '',
    amount: '',
    method: 'cash',
    transactionId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const bookingsRes = await axios.get('/api/bookings', { headers: { Authorization: `Bearer ${token}` } });
      setBookings(bookingsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const recordPayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/payments', form, { headers: { Authorization: `Bearer ${token}` } });
      alert('Payment recorded successfully!');
      setForm({ bookingId: '', amount: '', method: 'cash', transactionId: '' });
      fetchData();
    } catch (err) {
      alert('Failed to record payment');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Payments</h1>
      <div className="payment-form card">
        <h3>Record Payment</h3>
        <form onSubmit={recordPayment} className="car-form" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <select name="bookingId" value={form.bookingId} onChange={handleChange} required>
            <option value="">Select Booking</option>
            {bookings.filter(b => b.paymentStatus !== 'paid').map(b => (
              <option key={b._id} value={b._id}>
                {b.carId?.name} - ₹{b.totalCost} ({new Date(b.pickupDate).toLocaleDateString()})
              </option>
            ))}
          </select>
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
          <select name="method" value={form.method} onChange={handleChange}>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
            <option value="bank transfer">Bank Transfer</option>
          </select>
          <input type="text" name="transactionId" placeholder="Transaction ID (optional)" value={form.transactionId} onChange={handleChange} />
          <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>Record Payment</button>
        </form>
      </div>

      <h2>Booking Payment Status</h2>
      <div className="booking-list">
        {bookings.map(b => (
          <div key={b._id} className="booking-item card">
            <h4>{b.carId?.name}</h4>
            <p>Customer: {b.userId?.name}</p>
            <p>Total: ₹{b.totalCost}</p>
            <p>Payment Status: <span className={`status ${b.paymentStatus}`}>{b.paymentStatus}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;