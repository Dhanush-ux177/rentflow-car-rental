const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const Invoice = require('../models/Invoice');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Record payment
router.post('/', auth, admin, async (req, res) => {
  try {
    const { bookingId, amount, method, transactionId } = req.body;
    const payment = new Payment({ bookingId, amount, method, transactionId, status: 'completed' });
    await payment.save();

    // Update booking payment status
    const booking = await Booking.findById(bookingId);
    booking.paymentStatus = 'paid';
    await booking.save();

    // Update invoice status if exists
    if (booking.invoiceId) {
      await Invoice.findByIdAndUpdate(booking.invoiceId, { status: 'paid' });
    }

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payments for a booking
router.get('/booking/:bookingId', auth, admin, async (req, res) => {
  try {
    const payments = await Payment.find({ bookingId: req.params.bookingId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;