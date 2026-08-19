// Frontend/src/pages/CarDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Updated API call to use the live Render backend URL
    axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
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

  if (loading) return <div className="w-full text-center py-20 text-xl font-bold text-gray-500">Loading car details...</div>;
  if (!car) return <div className="w-full text-center py-20 text-xl font-bold text-red-500">Car not found</div>;

  return (
    // Full screen light gray background with flex centering
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 font-sans flex items-center justify-center">
      
      {/* White detailed card */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 w-full relative">
          <img 
            src={car.image || 'https://via.placeholder.com/600x400?text=Car'} 
            alt={car.name} 
            className="w-full h-full object-cover min-h-[400px] md:min-h-full" 
          />
          {/* Colored Availability Badge */}
          <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg ${car.availability ? 'bg-green-600' : 'bg-red-600'}`}>
            {car.availability ? '✓ Available' : '✗ Unavailable'}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-between">
          <div>
            {/* Titles */}
            <h1 className="text-3xl font-extrabold text-gray-800">{car.name}</h1>
            <p className="text-lg text-gray-500 font-bold mt-1">{car.model}</p>
            <p className="text-2xl font-extrabold text-[#0056D2] mt-2">₹{car.pricePerDay}/day</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-6 bg-gray-50 p-5 rounded-xl font-medium">
              <div><span className="font-bold text-gray-800">Year:</span> {car.year}</div>
              <div><span className="font-bold text-gray-800">Fuel:</span> {car.fuelType}</div>
              <div><span className="font-bold text-gray-800">Transmission:</span> {car.transmission}</div>
              <div><span className="font-bold text-gray-800">Seats:</span> {car.seatingCapacity}</div>
              <div><span className="font-bold text-gray-800">Mileage:</span> {car.mileage}</div>
              <div><span className="font-bold text-gray-800">Status:</span> {car.availability ? 'Available' : 'Not Available'}</div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <span className="font-bold text-gray-800 block mb-2">Features:</span>
              <div className="flex flex-wrap gap-2">
                {car.features?.length > 0 ? (
                  car.features.map((feat, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {feat}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 font-medium">N/A</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mt-6 font-normal text-base">{car.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={handleBook} 
              disabled={!car.availability}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-md ${car.availability ? 'bg-[#0056D2] hover:bg-blue-700 hover:shadow-lg' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {car.availability ? 'Book Now' : 'Not Available'}
            </button>
            <Link 
              to="/cars" 
              className="w-full text-center py-3 rounded-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-all"
            >
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;