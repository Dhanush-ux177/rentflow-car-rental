// Frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed: npm install axios

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    uniqueMembers: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when component loads
    const fetchStats = async () => {
      try {
        // Change 'http://localhost:5000' to your actual backend URL
        const response = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(response.data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-gray-500">Loading dashboard data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalBookings}</p>
        </div>

        {/* Card 2: Unique Members who booked */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Members Booked</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.uniqueMembers}</p>
          <p className="text-xs text-gray-400 mt-1">Unique users who have rented a car</p>
        </div>

        {/* Card 3: Total Registered Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Registered Users</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalUsers}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;