import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

function Booking() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    rentalType: 'self-drive',
    driverId: '',
    notes: ''
  });
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch car details
    axios.get(`/api/cars/${carId}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));

    // Fetch available drivers
    const token = localStorage.getItem('token');
    axios.get('/api/drivers', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDrivers(res.data.filter(d => d.status === 'available')))
      .catch(err => console.error(err));
  }, [carId]);

  useEffect(() => {
    if (form.pickupDate && form.returnDate && car) {
      const days = Math.max(1, Math.ceil((new Date(form.returnDate) - new Date(form.pickupDate)) / (1000 * 60 * 60 * 24)));
      const cost = days * car.pricePerDay;
      setTotalCost(cost + cost * 0.18);
    }
  }, [form.pickupDate, form.returnDate, car]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const payload = {
        carId,
        ...form,
        totalCost: totalCost
      };
      await axios.post('/api/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Booking created successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Booking failed: ' + err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <div className="booking-page">
      <h1>Book {car.name}</h1>
      <div className="booking-summary">
        <p>Price per day: ₹{car.pricePerDay}</p>
        <p>Total cost (incl. 18% GST): ₹{totalCost.toFixed(2)}</p>
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <div>
          <label>Pickup Date</label>
          <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Return Date</label>
          <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Pickup Location</label>
          <input type="text" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} required />
        </div>
        <div>
          <label>Return Location</label>
          <input type="text" name="returnLocation" value={form.returnLocation} onChange={handleChange} required />
        </div>
        <div>
          <label>Rental Type</label>
          <select name="rentalType" value={form.rentalType} onChange={handleChange}>
            <option value="self-drive">Self Drive</option>
            <option value="with-driver">With Driver</option>
          </select>
        </div>
        {form.rentalType === 'with-driver' && (
          <div>
            <label>Select Driver</label>
            <select name="driverId" value={form.driverId} onChange={handleChange}>
              <option value="">Select a driver</option>
              {drivers.map(d => (
                <option key={d._id} value={d._id}>{d.name} - {d.status}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
    </div>
  );
}

export default Booking;