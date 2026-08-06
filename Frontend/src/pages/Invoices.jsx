import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [invoicesRes, bookingsRes] = await Promise.all([
        axios.get('/api/invoices', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setInvoices(invoicesRes.data);
      setBookings(bookingsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const generateInvoice = async (bookingId) => {
    if (!bookingId) return alert('Please select a booking');
    const token = localStorage.getItem('token');
    try {
      await axios.post(`/api/invoices/generate/${bookingId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert('Invoice generated successfully!');
      fetchData();
    } catch (err) {
      alert('Failed to generate invoice');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Invoices</h1>
      <div className="invoice-generator">
        <h3>Generate Invoice from Booking</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select value={selectedBooking} onChange={(e) => setSelectedBooking(e.target.value)} style={{ padding: '8px', flex: 1 }}>
            <option value="">Select a booking</option>
            {bookings.filter(b => !b.invoiceId).map(b => (
              <option key={b._id} value={b._id}>
                {b.carId?.name} - {b.userId?.name} ({new Date(b.pickupDate).toLocaleDateString()})
              </option>
            ))}
          </select>
          <button onClick={() => generateInvoice(selectedBooking)} className="btn btn-primary">Generate</button>
        </div>
      </div>

      <h2>All Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices yet.</p>
      ) : (
        <div className="booking-list">
          {invoices.map(inv => (
            <div key={inv._id} className="booking-item card">
              <h4>Invoice #{inv.invoiceNumber}</h4>
              <p><strong>Customer:</strong> {inv.customerName}</p>
              <p><strong>Car:</strong> {inv.carName}</p>
              <p><strong>Rental Days:</strong> {inv.rentalDays}</p>
              <p><strong>Subtotal:</strong> ₹{inv.subtotal}</p>
              <p><strong>Tax (18%):</strong> ₹{inv.tax}</p>
              <p><strong>Total:</strong> ₹{inv.total}</p>
              <p><strong>Status:</strong> <span className={`status ${inv.status}`}>{inv.status}</span></p>
              <p><strong>Due Date:</strong> {new Date(inv.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Invoices;