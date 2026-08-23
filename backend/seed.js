require('dotenv').config();
const dns = require('node:dns');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

if (process.env.DNS_SERVER) dns.setServers([process.env.DNS_SERVER]);

// --- Schemas ---
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  licenseNumber: String,
  role: { type: String, enum: ['user','admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const CarSchema = new mongoose.Schema({
  name: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  fuelType: String,
  seatingCapacity: Number,
  transmission: String,
  mileage: String,
  image: String,
  features: [String],
  availability: { type: Boolean, default: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Car = mongoose.model('Car', CarSchema);

// --- Seed function ---
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await User.deleteMany({});
    await Car.deleteMany({});
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = new User({
      name: 'John User',
      email: 'user@example.com',
      password: hashedPassword,
      phone: '+91-9876543210',
      address: '123 Main St, City',
      licenseNumber: 'DL123456',
      role: 'user'
    });
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      phone: '+91-9876543211',
      address: '456 Admin Ave, City',
      licenseNumber: 'DL654321',
      role: 'admin'
    });
    await user.save();
    await admin.save();
    console.log('Added users');

    // --- YOUR COMPLETE 17 CAR LIST WITH 2024-25 MARKET RENTAL PRICES ---
    const cars = [
      // 1. BE 6
      {
        name: 'Mahindra BE 6',
        model: 'BE 6',
        year: 2024,
        pricePerDay: 6500, 
        fuelType: 'Electric',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '500 km/charge',
        image: '/images/be6.jpg',
        features: ['Panoramic Sunroof', 'EV Powertrain', 'Regenerative Braking', 'Touchscreen'],
        description: 'Mahindra’s futuristic and bold electric SUV with exceptional performance and style.',
        availability: true
      },
      // 2. Brezza
      {
        name: 'Maruti Suzuki Brezza',
        model: 'Brezza',
        year: 2023,
        pricePerDay: 3800,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '19 km/l',
        image: '/images/brezza.jpg',
        features: ['SmartPlay Infotainment', 'Cruise Control', 'Auto AC', 'Hill Hold'],
        description: 'India’s most reliable compact SUV, perfect for comfortable daily city drives.',
        availability: true
      },
      // 3. Ciaz
      {
        name: 'Suzuki Ciaz',
        model: 'Ciaz',
        year: 2022,
        pricePerDay: 2800,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Manual',
        mileage: '20 km/l',
        image: '/images/ciaz.jpg',
        features: ['Spacious Cabin', 'Cruise Control', 'Climate Control', 'Smart Key'],
        description: 'Elegant and fuel-efficient sedan, ideal for comfortable and economical highway drives.',
        availability: true
      },
      // 4. Creta
      {
        name: 'Hyundai Creta',
        model: 'Creta',
        year: 2023,
        pricePerDay: 4800,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '18 km/l',
        image: '/images/creta.jpg',
        features: ['Sunroof', 'Ventilated Seats', 'Advanced Safety', 'LED Lighting'],
        description: 'The stylish, tech-packed modern SUV that dominates the Indian mid-size segment.',
        availability: true
      },
      // 5. Innova Crysta
      {
        name: 'Toyota Innova Crysta',
        model: 'Innova Crysta',
        year: 2023,
        pricePerDay: 6000,
        fuelType: 'Diesel',
        seatingCapacity: 7,
        transmission: 'Automatic',
        mileage: '15 km/l',
        image: '/images/innova-crysta.jpg',
        features: ['Premium AC', 'Cruise Control', 'Rear Camera', 'Bluetooth'],
        description: 'The ultimate premium MPV with uncompromised comfort, perfect for large family trips.',
        availability: true
      },
      // 6. Nexon
      {
        name: 'Tata Nexon',
        model: 'Nexon',
        year: 2023,
        pricePerDay: 4000,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '17 km/l',
        image: '/images/nexon.jpg',
        features: ['5-Star Safety Rating', 'Connected Car Tech', 'Projector Lights', 'Alloy Wheels'],
        description: 'India’s best-selling compact SUV, famous for its top-tier safety and aggressive styling.',
        availability: true
      },
      // 7. Punch
      {
        name: 'Tata Punch',
        model: 'Punch',
        year: 2022,
        pricePerDay: 3200,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Manual',
        mileage: '19 km/l',
        image: '/images/punch.jpg',
        features: ['Impact Design', 'ABS with EBD', 'Multi-info Display', 'Front Airbags'],
        description: 'A bold micro-SUV with exceptional ground clearance and unmistakable Tata road presence.',
        availability: true
      },
      // 8. Punch Electric
      {
        name: 'Tata Punch EV',
        model: 'Punch EV',
        year: 2024,
        pricePerDay: 4200,
        fuelType: 'Electric',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '350 km/charge',
        image: '/images/punchelectric.jpg',
        features: ['EV Screen', 'Regen Braking', 'Digital Cluster', 'Hill Assist'],
        description: 'The punchy and bold micro-SUV, now electrified for a sustainable and silent drive.',
        availability: true
      },
      // 9. Scorpio
      {
        name: 'Mahindra Scorpio',
        model: 'Scorpio',
        year: 2022,
        pricePerDay: 4500,
        fuelType: 'Diesel',
        seatingCapacity: 7,
        transmission: 'Manual',
        mileage: '13 km/l',
        image: '/images/scorpio.jpg',
        features: ['Power Steering', 'Infotainment', 'Roof Rails', 'Alloy Wheels'],
        description: 'The rugged and reliable big SUV, built to conquer rough terrains and city roads alike.',
        availability: true
      },
      // 10. Seltos
      {
        name: 'Kia Seltos',
        model: 'Seltos',
        year: 2023,
        pricePerDay: 5500,
        fuelType: 'Diesel',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '16 km/l',
        image: '/images/seltos.jpg',
        features: ['UVO Connect', 'Ventilated Seats', 'Bose Sound System', 'LED Lighting'],
        description: 'The premium mid-size SUV with aggressive styling and top-tier technology features.',
        availability: true
      },
      // 11. Sierra
      {
        name: 'Tata Sierra',
        model: 'Sierra',
        year: 2023,
        pricePerDay: 5200,
        fuelType: 'Diesel',
        seatingCapacity: 5,
        transmission: 'Manual',
        mileage: '15 km/l',
        image: '/images/sierra.jpg',
        features: ['Projector Headlamps', 'Cruise Control', 'Multi-Drive Modes', 'Touchscreen'],
        description: 'The iconic Tata SUV makes a stunning return with a retro-modern design.',
        availability: true
      },
      // 12. Sierra Electric
      {
        name: 'Tata Sierra EV',
        model: 'Sierra EV',
        year: 2024,
        pricePerDay: 7800,
        fuelType: 'Electric',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '450 km/charge',
        image: '/images/sierraelectric.jpg',
        features: ['EV Dashboard', 'Regenerative Braking', 'Panoramic Roof', 'Advanced Safety'],
        description: 'The all-electric variant of the iconic Sierra, blending heritage with futuristic EV tech.',
        availability: true
      },
      // 13. Sonet
      {
        name: 'Kia Sonet',
        model: 'Sonet',
        year: 2023,
        pricePerDay: 3800,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '18 km/l',
        image: '/images/sonet.jpg',
        features: ['UVO Connect', 'Wireless Charging', 'Smart Key', 'Rear AC Vents'],
        description: 'A compact, feature-packed SUV packed with style, designed for young urban drivers.',
        availability: true
      },
      // 14. Taigun
      {
        name: 'Volkswagen Taigun',
        model: 'Taigun',
        year: 2023,
        pricePerDay: 4800,
        fuelType: 'Petrol',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '16 km/l',
        image: '/images/taigun.jpg',
        features: ['Active Cylinder Tech', 'VW Connect', 'Sunroof', 'LED Headlamps'],
        description: 'German-engineered SUV with a robust build quality and thrilling turbo-petrol performance.',
        availability: true
      },
      // 15. Thar
      {
        name: 'Mahindra Thar',
        model: 'Thar',
        year: 2022,
        pricePerDay: 6200,
        fuelType: 'Diesel',
        seatingCapacity: 4,
        transmission: 'Manual',
        mileage: '12 km/l',
        image: '/images/thar.jpg',
        features: ['4x4 Drive Mode', 'Rugged Build', 'Hard Top', 'Roof Rails'],
        description: 'The iconic off-roader built for true adventure, conquering trails and tough expeditions.',
        availability: true
      },
      // 16. TUV 300
      {
        name: 'Mahindra TUV 300',
        model: 'TUV 300',
        year: 2021,
        pricePerDay: 3300,
        fuelType: 'Diesel',
        seatingCapacity: 7,
        transmission: 'Manual',
        mileage: '17 km/l',
        image: '/images/tuv300.jpg',
        features: ['ABS', 'Airbags', 'Rear AC Vents', 'Audio System'],
        description: 'The compact yet spacious 7-seater SUV, excellent for daily commutes and small groups.',
        availability: true
      },
      // 17. Vitara Electric
      {
        name: 'Maruti Suzuki eVitara',
        model: 'eVitara',
        year: 2024,
        pricePerDay: 6000,
        fuelType: 'Electric',
        seatingCapacity: 5,
        transmission: 'Automatic',
        mileage: '500 km/charge',
        image: '/images/vitaraelectric.jpg',
        features: ['EV Technology', 'Smart Electrics', 'Panoramic View', 'Advanced Safety Suite'],
        description: 'Suzuki’s premium entry into the EV segment, combining elegant style with sustainability.',
        availability: true
      }
    ];

    await Car.insertMany(cars);
    console.log(`✅ Successfully seeded ${cars.length} cars with today's market rental prices!`);
    console.log('✅ Database seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();