import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/cars')
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleBrowse = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/cars');
    } else {
      // If not logged in, go to register page (or login?)
      // The user said: "if the user already register redirect to login page"
      // So we can go to /login and they can login or register from there.
      // But to be safe, we'll send them to /login.
      navigate('/login');
    }
  };

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  // Duplicate the array for seamless scrolling
  const doubledCars = [...cars, ...cars, ...cars];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>🚗 Drive Your Dream Car</h1>
        <p>Rent the best cars at affordable prices. Explore our fleet and book now.</p>
        <button onClick={handleBrowse} className="btn btn-primary">Browse All Cars</button>
      </section>

      {/* Featured Cars - Continuous Scrolling */}
      <section className="featured">
        <h2>✨ Featured Cars</h2>
        <div className="car-scroll-container">
          <div className="car-scroll-track">
            {doubledCars.map((car, index) => (
              <div key={`${car._id}-${index}`} className="car-slide">
                <img 
                  src={car.image || 'https://via.placeholder.com/400x300?text=Car'} 
                  alt={car.name}
                  className="car-slide-image"
                />
                <div className="car-slide-info">
                  <h3>{car.name}</h3>
                  <p className="car-slide-price">₹{car.pricePerDay}/day</p>
                  <p className="car-slide-meta">{car.fuelType} • {car.seatingCapacity} Seats</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>🚗 {cars.length}+</h3>
          <p>Cars Available</p>
        </div>
        <div className="stat-item">
          <h3>⭐ 4.8</h3>
          <p>Average Rating</p>
        </div>
        <div className="stat-item">
          <h3>🏆 500+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>📍 10+</h3>
          <p>Locations</p>
        </div>
      </section>
    </div>
  );
}

export default Home;