const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Generate invoice from booking
router.post('/generate/:bookingId', auth, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('carId userId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const days = Math.ceil((booking.returnDate - booking.pickupDate) / (1000*60*60*24));
    const subtotal = days * booking.carId.pricePerDay;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const invoice = new Invoice({
      bookingId: booking._id,
      invoiceNumber: `INV-${Date.now()}`,
      customerName: booking.userId.name,
      customerEmail: booking.userId.email,
      carName: booking.carId.name,
      rentalDays: days,
      dailyRate: booking.carId.pricePerDay,
      subtotal,
      tax,
      total,
      dueDate: new Date(Date.now() + 7*24*60*60*1000) // 7 days
    });
    await invoice.save();

    // Link invoice to booking
    booking.invoiceId = invoice._id;
    await booking.save();

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all invoices
router.get('/', auth, admin, async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('bookingId');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;