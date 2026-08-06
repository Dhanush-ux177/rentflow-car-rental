// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');

router.get('/stats', async (req, res) => {
  try {
    // 1. Total number of bookings in the database
    const totalBookings = await Booking.countDocuments();

    // 2. Total number of UNIQUE members who have placed a booking
    // distinct('userId') returns an array of unique user IDs
    const uniqueMembersArray = await Booking.distinct('userId');
    const uniqueMembers = uniqueMembersArray.length;

    // 3. Total registered users in the system (optional, but nice for admin)
    const totalUsers = await User.countDocuments();

    res.status(200).json({ 
      success: true, 
      stats: { totalBookings, uniqueMembers, totalUsers } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;