import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    bookingId: '',
    reminderDate: '',
    message: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [remindersRes, bookingsRes] = await Promise.all([
        axios.get('/api/reminders', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setReminders(remindersRes.data);
      setBookings(bookingsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createReminder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/reminders', form, { headers: { Authorization: `Bearer ${token}` } });
      alert('Reminder created!');
      setForm({ bookingId: '', reminderDate: '', message: '' });
      fetchData();
    } catch (err) {
      alert('Failed to create reminder');
    }
  };

  const markSent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/reminders/${id}/sent`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      alert('Failed to update reminder');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Reminders</h1>
      <div className="reminder-form card">
        <h3>Create Reminder</h3>
        <form onSubmit={createReminder} className="car-form" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <select name="bookingId" value={form.bookingId} onChange={handleChange} required>
            <option value="">Select Booking</option>
            {bookings.map(b => (
              <option key={b._id} value={b._id}>
                {b.carId?.name} - {b.userId?.name}
              </option>
            ))}
          </select>
          <input type="date" name="reminderDate" value={form.reminderDate} onChange={handleChange} required />
          <input type="text" name="message" placeholder="Reminder message" value={form.message} onChange={handleChange} style={{ gridColumn: '1 / -1' }} />
          <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>Add Reminder</button>
        </form>
      </div>

      <h2>All Reminders</h2>
      <div className="booking-list">
        {reminders.map(r => (
          <div key={r._id} className="booking-item card">
            <p><strong>Booking:</strong> {r.bookingId?.carId?.name} - {r.bookingId?.userId?.name}</p>
            <p><strong>Reminder Date:</strong> {new Date(r.reminderDate).toLocaleString()}</p>
            <p><strong>Message:</strong> {r.message}</p>
            <p><strong>Status:</strong> {r.isSent ? '✅ Sent' : '⏳ Pending'}</p>
            {!r.isSent && (
              <button onClick={() => markSent(r._id)} className="btn btn-primary">Mark as Sent</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reminders;