import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Cars.css';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    priceMin: '',
    priceMax: '',
    fuelType: '',
    seating: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters(prev => ({ ...prev, ...params }));
    fetchCars(params);
  }, [searchParams]);

  const fetchCars = (params) => {
    setLoading(true);
    axios.get('/api/cars', { params })
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) params[key] = filters[key];
    });
    setSearchParams(params);
    setShowFilters(false); // Close filters after applying
  };

  const clearFilters = () => {
    setFilters({ search: '', priceMin: '', priceMax: '', fuelType: '', seating: '' });
    setSearchParams({});
    setShowFilters(false);
  };

  return (
    <div className="cars-page">
      {/* Filter Toggle Button */}
      <div className="filter-header">
        <h2>All Cars</h2>
        <button 
          className="filter-toggle-btn" 
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? '✕' : '⚙️'} Filters
        </button>
      </div>

      {/* Filter Panel (hidden by default) */}
      {showFilters && (
        <div className="filters">
          <input
            type="text"
            name="search"
            placeholder="Search cars..."
            value={filters.search}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="priceMin"
            placeholder="Min price"
            value={filters.priceMin}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="priceMax"
            placeholder="Max price"
            value={filters.priceMax}
            onChange={handleFilterChange}
          />
          <select name="fuelType" value={filters.fuelType} onChange={handleFilterChange}>
            <option value="">All Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
          <select name="seating" value={filters.seating} onChange={handleFilterChange}>
            <option value="">Any Seats</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="6">6 Seats</option>
            <option value="7">7 Seats</option>
          </select>
          <button onClick={applyFilters} className="btn btn-primary">Apply</button>
          <button onClick={clearFilters} className="btn btn-outline">Clear</button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : cars.length === 0 ? (
        <p>No cars found matching your criteria.</p>
      ) : (
        <div className="car-grid">
          {cars.map(car => (
            <div key={car._id} className="car-card card">
              <img src={car.image || 'https://via.placeholder.com/400x300?text=Car'} alt={car.name} />
              <h3>{car.name}</h3>
              <p className="car-model">{car.model}</p>
              <p className="price">₹{car.pricePerDay}/day</p>
              <p className="car-meta">{car.fuelType} • {car.seatingCapacity} Seats • {car.transmission}</p>
              <Link to={`/cars/${car._id}`} className="btn btn-primary">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars;