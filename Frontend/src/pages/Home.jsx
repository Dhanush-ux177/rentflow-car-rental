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
        <span className="hero-eyebrow">Rentflow &middot; Self-drive &amp; chauffeured</span>
        <h1>Drive your dream car</h1>
        <p>Rent the best cars at affordable prices. Explore our fleet and book in minutes.</p>
        <button onClick={handleBrowse} className="btn btn-primary">Browse All Cars</button>
      </section>

      <div className="lane-divider" aria-hidden="true"></div>

      {/* Featured Cars - Continuous Scrolling */}
      <section className="featured">
        <h2>Featured cars</h2>
        <p className="featured-sub">Fresh off the lot</p>
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
          <h3>{cars.length}+</h3>
          <p>Cars available</p>
        </div>
        <div className="stat-item">
          <h3>4.8</h3>
          <p>Average rating</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Happy customers</p>
        </div>
        <div className="stat-item">
          <h3>10+</h3>
          <p>Locations</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
