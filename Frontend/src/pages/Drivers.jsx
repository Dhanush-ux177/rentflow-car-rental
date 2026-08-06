import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', licenseNumber: '', address: '', status: 'available'
  });

  const fetchDrivers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/drivers', { headers: { Authorization: `Bearer ${token}` } });
    setDrivers(res.data);
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (editing) {
      await axios.put(`/api/drivers/${editing}`, form, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post('/api/drivers', form, { headers: { Authorization: `Bearer ${token}` } });
    }
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', email: '', phone: '', licenseNumber: '', address: '', status: 'available' });
    fetchDrivers();
  };

  const deleteDriver = async (id) => {
    if (!window.confirm('Delete this driver?')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`/api/drivers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchDrivers();
  };

  return (
    <div className="dashboard">
      <h1>Manage Drivers</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">Add Driver</button>
      {showForm && (
        <form onSubmit={handleSubmit} className="car-form">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <input type="text" name="licenseNumber" placeholder="License Number" value={form.licenseNumber} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="off-duty">Off-Duty</option>
          </select>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'}</button>
        </form>
      )}
      <div className="booking-list">
        {drivers.map(d => (
          <div key={d._id} className="booking-item card">
            <h4>{d.name}</h4>
            <p>Email: {d.email}</p>
            <p>Phone: {d.phone}</p>
            <p>License: {d.licenseNumber}</p>
            <p>Status: <span className={`status ${d.status}`}>{d.status}</span></p>
            <div>
              <button onClick={() => { setEditing(d._id); setForm(d); setShowForm(true); }} className="btn">Edit</button>
              <button onClick={() => deleteDriver(d._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;