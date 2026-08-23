require('dotenv').config();
const dns = require('node:dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.DNS_SERVER) dns.setServers([process.env.DNS_SERVER]);

// ===== CORS – allow your frontend =====
const allowedOrigins = [
  'http://localhost:3000',
  'https://rentflow-car-rental-1.onrender.com',   // ← your frontend URL
  'https://rentflow-l80j.onrender.com'            // optional
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ===== MONGODB CONNECTION =====
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ===== MODELS =====
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  licenseNumber: String,
  cnic: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'], required: true },
  seatingCapacity: { type: Number, required: true },
  transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },
  mileage: String,
  image: { type: String, default: 'https://via.placeholder.com/400x300?text=Car' },
  features: [String],
  availability: { type: Boolean, default: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Car = mongoose.model('Car', CarSchema);

const Booking = require('./models/Booking');
const Driver = require('./models/Driver');
const Invoice = require('./models/Invoice');
const Payment = require('./models/Payment');
const Reminder = require('./models/Reminder');

// ===== AUTH MIDDLEWARE =====
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

// ===== AUTH ROUTES =====
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, licenseNumber, cnic } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, phone, address, licenseNumber, cnic });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== CAR ROUTES =====
app.get('/api/cars', async (req, res) => {
  try {
    const { priceMin, priceMax, fuelType, seating, search } = req.query;
    let filter = {};
    if (priceMin || priceMax) filter.pricePerDay = {};
    if (priceMin) filter.pricePerDay.$gte = Number(priceMin);
    if (priceMax) filter.pricePerDay.$lte = Number(priceMax);
    if (fuelType) filter.fuelType = fuelType;
    if (seating) filter.seatingCapacity = Number(seating);
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } }
    ];
    const cars = await Car.find(filter);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/cars', auth, admin, async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/cars/:id', auth, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/cars/:id', auth, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== BOOKING ROUTES =====
app.post('/api/bookings', auth, async (req, res) => {
  try {
    const { carId, pickupDate, returnDate, pickupLocation, returnLocation, totalCost, notes, rentalType, driverId } = req.body;
    const userId = req.user.id;
    const booking = new Booking({
      userId, carId, pickupDate, returnDate, pickupLocation, returnLocation, totalCost, notes,
      rentalType: rentalType || 'self-drive',
      driverId: driverId || null
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/bookings/user/:userId', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('carId')
      .populate('driverId', 'name');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/bookings', auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('carId', 'name model')
      .populate('driverId', 'name');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/bookings/:id', auth, admin, async (req, res) => {
  try {
    const { status, rentalType, driverId, paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, 
      { status, rentalType, driverId, paymentStatus }, 
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/bookings/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== ADMIN STATS =====
app.get('/api/admin/stats', auth, admin, async (req, res) => {
  try {
    const safeCount = async (model, filter = {}) => {
      try { return await model.countDocuments(filter); } catch (e) { return 0; }
    };
    const safeAggregate = async (model, pipeline) => {
      try { return await model.aggregate(pipeline); } catch (e) { return []; }
    };

    const totalCars = await safeCount(Car);
    const availableCars = await safeCount(Car, { availability: true });
    const totalBookings = await safeCount(Booking);
    const completedBookings = await safeCount(Booking, { status: 'completed' });
    const totalCustomers = await safeCount(User, { role: 'user' });
    const totalDrivers = await safeCount(Driver);
    const availableDrivers = await safeCount(Driver, { status: 'available' });
    const revenueResult = await safeAggregate(Booking, [
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalCost' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      totalCars,
      availableCars,
      totalBookings,
      completedBookings,
      totalRevenue,
      totalCustomers,
      totalDrivers,
      availableDrivers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== USERS ROUTE (admin) =====
app.get('/api/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== OTHER ROUTES =====
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/reminders', require('./routes/reminders'));

// ===== SERVE STATIC FRONTEND (if frontend is served from this service) =====
// If you are using separate frontend service, you can comment these lines out.
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for React Router (only if you serve frontend from this service)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));