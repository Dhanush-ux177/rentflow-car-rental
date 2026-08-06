# ⚡ Quick Reference Guide

## 📍 Application URLs

### Local Development
```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
MongoDB:   localhost:27017
```

### Production (After Deployment)
```
Frontend:  https://your-frontend-url.com
Backend:   https://your-backend-url.com
```

---

## 👤 Test Credentials

### Regular User
```
Email:    user@example.com
Password: password123
```

### Admin User
```
Email:    admin@example.com
Password: password123
```

---

## 🚀 Quick Start Commands

### Terminal 1: MongoDB
```bash
# Windows (if installed)
mongod

# macOS (Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod
```

### Terminal 2: Backend
```bash
cd backend
npm install        # First time only
npm run seed       # Populate database (first time)
npm run dev        # Start server
```

### Terminal 3: Frontend
```bash
cd frontend
npm install        # First time only
npm run dev        # Start development server
```

---

## 📋 Key Files Location

### Backend Files
```
server.js          - Main Express server
package.json       - Backend dependencies
.env              - Configuration (edit these values!)
seed.js           - Database seeding script
```

### Frontend Files
```
src/pages/        - All page components
src/components/   - Reusable components
src/index.css     - Global styles
index.html        - HTML entry point
vite.config.js    - Vite configuration
```

---

## 🔄 Common Workflows

### Add a New Car (Admin)
1. Login as admin
2. Go to Admin Panel
3. Click "Add New Car"
4. Fill in car details
5. Click "Add Car"

### Make a Booking (User)
1. Browse cars
2. Click on a car
3. Click "Book Now"
4. Select pickup/return dates
5. Choose locations
6. Click "Complete Booking"

### Check Bookings (User)
1. Login
2. Click "My Dashboard"
3. View "My Bookings" tab

### Manage Bookings (Admin)
1. Login as admin
2. Go to Admin Panel
3. Click "Bookings" tab
4. Update status from dropdown

---

## 🛠️ Troubleshooting Quick Fixes

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # macOS/Linux

# Try different port
# Edit .env: PORT=5001
```

### MongoDB connection error
```bash
# Verify MongoDB is running
mongosh  # Should connect

# If using Atlas, verify:
# - Connection string in .env
# - IP whitelist
# - Database user credentials
```

### Frontend can't connect to backend
```bash
# Check if backend is running on 5000
# Check vite.config.js proxy settings
# Clear browser cache (Ctrl+Shift+Delete)
# Hard refresh (Ctrl+F5)
```

### Styles not loading
```bash
# Check CSS file paths
# Clear node_modules
npm install

# Restart frontend
npm run dev
```

---

## 📊 API Endpoints Cheat Sheet

### Auth
```
POST /api/auth/register
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91-9876543210"
}

POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Cars
```
GET /api/cars                    # Get all cars
GET /api/cars?priceMin=1000&priceMax=5000  # With filters
GET /api/cars/:id                # Get single car
POST /api/cars                   # Add car (admin)
PUT /api/cars/:id               # Update car (admin)
DELETE /api/cars/:id            # Delete car (admin)
```

### Bookings
```
POST /api/bookings               # Create booking
GET /api/bookings/user/:userId   # Get user bookings
GET /api/bookings                # Get all bookings (admin)
PUT /api/bookings/:id            # Update booking status
PUT /api/bookings/:id/cancel     # Cancel booking
```

---

## 🔐 Authentication

### How to authenticate API calls
```javascript
// Get token from localStorage
const token = localStorage.getItem('token');

// Use in axios requests
axios.get('http://localhost:5000/api/...',  {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### Token Format
```
Header: Authorization
Value: Bearer <your_jwt_token>
```

---

## 📱 Page Routes

```
/                    - Home
/cars                - Car listing
/cars/:id           - Car details
/booking/:carId     - Booking form
/login              - Login page
/register           - Registration
/dashboard          - User dashboard
/admin              - Admin dashboard (auth required)
```

---

## 🎯 Performance Tips

### Frontend
```bash
# Build optimized version
npm run build

# Check build size
ls -lh dist/
```

### Backend
```bash
# Monitor server
npm run dev

# Check database indexes
db.cars.getIndexes()
```

---

## 📦 Useful npm Commands

### Frontend
```bash
npm install          # Install dependencies
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview build
npm run lint        # Check code quality
npm update          # Update all packages
```

### Backend
```bash
npm install         # Install dependencies
npm start           # Production start
npm run dev         # Development with auto-reload
npm run seed        # Populate database
npm list            # List packages
npm outdated        # Check for updates
```

---

## 🐛 Debugging Tips

### Frontend Debugging
```bash
# Open Chrome DevTools: F12
# Console tab: Check for errors
# Network tab: Monitor API calls
# Elements tab: Inspect HTML
```

### Backend Debugging
```bash
# Check server logs
# Add console.log() statements
# Use MongoDB Compass to view data
# Check .env variables
```

---

## 🚀 Deployment Steps

### Deploy Backend (Heroku)
```bash
heroku login
heroku create app-name
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...
git push heroku main
```

### Deploy Frontend (Vercel)
```bash
npm install -g vercel
vercel
# Follow prompts
```

---

## 📊 Database Collections

### Users
```
_id, name, email, password, phone, 
address, licenseNumber, role, createdAt
```

### Cars
```
_id, name, model, year, pricePerDay,
fuelType, seatingCapacity, transmission,
mileage, image, features, availability, description
```

### Bookings
```
_id, userId, carId, pickupDate, returnDate,
pickupLocation, returnLocation, totalCost,
status, paymentStatus, notes, createdAt
```

---

## ✅ Daily Checklist

- [ ] MongoDB running
- [ ] Backend started on port 5000
- [ ] Frontend started on port 3000
- [ ] Can login with demo account
- [ ] Can browse cars
- [ ] Can make booking
- [ ] Can view admin dashboard

---

## 🔗 Useful Links

- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **MongoDB Docs**: https://docs.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/
- **Vite Docs**: https://vitejs.dev/
- **Node.js Docs**: https://nodejs.org/en/docs/

---

## 💡 Pro Tips

1. **Use Postman** for testing API endpoints
2. **Use MongoDB Compass** to view database visually
3. **Use VS Code Extensions** for better development
4. **Enable auto-save** in your editor
5. **Use git** for version control
6. **Test on mobile** before deployment
7. **Keep .env secure** - never commit to git
8. **Use environment variables** for configuration

---

## 🆘 Getting Help

1. Check README.md for full documentation
2. Read SETUP_GUIDE.md for detailed setup
3. Look for error messages in console
4. Check browser DevTools (F12)
5. Search GitHub issues
6. Check Stack Overflow
7. Email: info@rentflow.com

---

## 📝 Notes

- Keep MongoDB running in background
- Don't commit .env to Git
- Use strong JWT_SECRET in production
- Update dependencies regularly
- Test before deploying
- Monitor production logs

---

**Last Updated: August 2024**
**Version: 1.0.0**
**Status: ✅ Ready for Production**
