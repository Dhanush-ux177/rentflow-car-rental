const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  invoiceNumber: { type: String, unique: true },
  customerName: String,
  customerEmail: String,
  carName: String,
  rentalDays: Number,
  dailyRate: Number,
  subtotal: Number,
  tax: Number,
  total: Number,
  issuedDate: { type: Date, default: Date.now },
  dueDate: Date,
  status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);