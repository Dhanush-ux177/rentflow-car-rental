import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-users-page">
      <h1>All Users (Admins included)</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="users-grid">
          {users.map(u => (
            <div key={u._id} className="user-card">
              <h3>{u.name}</h3>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> <span className={`role-badge ${u.role}`}>{u.role}</span></p>
              <p><strong>Phone:</strong> {u.phone || 'N/A'}</p>
              <p><strong>Address:</strong> {u.address || 'N/A'}</p>
              <p><strong>License:</strong> {u.licenseNumber || 'N/A'}</p>
              <p><strong>CNIC:</strong> {u.cnic || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;