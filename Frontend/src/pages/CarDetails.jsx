import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarDetails.css';

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/cars/${id}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleBook = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/booking/${id}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <div className="car-details">
      <img src={car.image || 'https://via.placeholder.com/600x400?text=Car'} alt={car.name} className="detail-image" />
      <div className="detail-info">
        <h1>{car.name} ({car.model})</h1>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Fuel:</strong> {car.fuelType}</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Seats:</strong> {car.seatingCapacity}</p>
        <p><strong>Mileage:</strong> {car.mileage}</p>
        <p><strong>Price:</strong> ₹{car.pricePerDay}/day</p>
        <p><strong>Availability:</strong> {car.availability ? 'Available' : 'Not Available'}</p>
        <p><strong>Features:</strong> {car.features?.join(', ') || 'N/A'}</p>
        <p>{car.description}</p>
        <button onClick={handleBook} className="btn btn-primary" disabled={!car.availability}>
          {car.availability ? 'Book Now' : 'Unavailable'}
        </button>
        <Link to="/cars" className="btn">Back to Cars</Link>
      </div>
    </div>
  );
}

export default CarDetails;