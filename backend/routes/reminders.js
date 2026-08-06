const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create reminder for a booking
router.post('/', auth, admin, async (req, res) => {
  try {
    const { bookingId, reminderDate, message } = req.body;
    const reminder = new Reminder({ bookingId, reminderDate, message });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get reminders
router.get('/', auth, admin, async (req, res) => {
  try {
    const reminders = await Reminder.find().populate('bookingId');
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark as sent
router.put('/:id/sent', auth, admin, async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, { isSent: true }, { new: true });
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;