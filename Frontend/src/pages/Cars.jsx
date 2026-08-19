// Frontend/src/pages/Cars.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

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
    // Fixed syntax: used proper backticks for the template literal and safe URL
    axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, { params })
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
    // Full-width background with padding
    <div className="min-h-screen w-full bg-gray-50 px-6 py-8 font-sans">
      
      {/* Header and Filter Toggle Button */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">All Cars</h2>
        <button
          className="bg-[#1a2332] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? '✕ Close Filters' : '⚙️ Filters'}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-bold text-gray-700 mb-1">Search cars...</label>
            <input
              type="text"
              name="search"
              placeholder="Search by name or model"
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-bold text-gray-700 mb-1">Min price</label>
            <input
              type="number"
              name="priceMin"
              placeholder="Min"
              value={filters.priceMin}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-bold text-gray-700 mb-1">Max price</label>
            <input
              type="number"
              name="priceMax"
              placeholder="Max"
              value={filters.priceMax}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-gray-50"
            />
          </div>
          <div className="w-40">
            <label className="block text-sm font-bold text-gray-700 mb-1">Fuel Type</label>
            <select name="fuelType" value={filters.fuelType} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-white">
              <option value="">All Fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="w-40">
            <label className="block text-sm font-bold text-gray-700 mb-1">Seats</label>
            <select name="seating" value={filters.seating} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056D2] bg-white">
              <option value="">Any Seats</option>
              <option value="4">4 Seats</option>
              <option value="5">5 Seats</option>
              <option value="6">6 Seats</option>
              <option value="7">7 Seats</option>
            </select>
          </div>
          <button onClick={applyFilters} className="bg-[#0056D2] text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm">
            Apply
          </button>
          <button onClick={clearFilters} className="bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition shadow-sm">
            Clear
          </button>
        </div>
      )}

      {/* Loading & Empty States */}
      {loading ? (
        <div className="w-full text-center py-20 text-xl font-bold text-gray-500">Loading vehicles...</div>
      ) : cars.length === 0 ? (
        <div className="w-full text-center py-20">
          <p className="text-xl font-bold text-gray-600 mb-2">No cars found matching your criteria.</p>
          <button onClick={clearFilters} className="text-[#0056D2] font-bold hover:underline text-lg">Clear filters</button>
        </div>
      ) : (
        /* Car Grid (3 Columns) */
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="h-56 bg-gray-100 relative">
                <img 
                  src={car.image || 'https://via.placeholder.com/400x300?text=Car'} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Car'; }}
                />
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Available
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold text-gray-800 mb-1">{car.name}</h3>
                <p className="text-gray-500 font-medium text-sm mb-2">{car.model}</p>
                <p className="text-xl font-bold text-[#0056D2] mb-3">₹{car.pricePerDay}/day</p>
                
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-lg font-medium">{car.fuelType}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg font-medium">{car.seatingCapacity} Seats</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg font-medium">{car.transmission}</span>
                </div>
                
                <Link 
                  to={`/cars/${car._id}`} 
                  className="mt-auto w-full bg-[#1a2332] text-white text-center py-3 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars;