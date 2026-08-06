# 🚀 RentFlow Car Rental System - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Deployment](#deployment)

---

## Prerequisites

### Required Software
- **Node.js** (v14.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **MongoDB** (v4.4 or higher)
  - Option 1: Local Installation - https://docs.mongodb.com/manual/installation/
  - Option 2: MongoDB Atlas (Cloud) - https://www.mongodb.com/cloud/atlas
  - Verify: `mongod --version`

- **Git** (for version control)
  - Download from: https://git-scm.com/

- **Text Editor/IDE**
  - VS Code (recommended) - https://code.visualstudio.com/
  - Or any code editor of your choice

---

## Backend Setup

### Step 1: Create Backend Directory
```bash
mkdir car-rental-backend
cd car-rental-backend
```

### Step 2: Initialize Node Project
```bash
npm init -y
```

### Step 3: Install Dependencies
```bash
npm install express mongoose cors dotenv jsonwebtoken bcryptjs multer
npm install --save-dev nodemon
```

### Step 4: Create Project Files
Copy the following files to your backend directory:
- `server.js` - Main Express server
- `package.json` - Already created above
- Create `.env` file with:

```env
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
PORT=5000
NODE_ENV=development
```

### Step 5: Update package.json Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seed.js"
  }
}
```

### Step 6: Test Backend
```bash
npm run dev
# You should see: "Server running on port 5000"
# And: "Connected to MongoDB"
```

---

## Frontend Setup

### Step 1: Create React Project with Vite
```bash
npm create vite@latest car-rental-frontend -- --template react
cd car-rental-frontend
```

### Step 2: Install Dependencies
```bash
npm install
npm install react-router-dom axios
```

### Step 3: Create Folder Structure
```bash
mkdir -p src/pages src/components
```

### Step 4: Copy Frontend Files
Copy all React components and styles to appropriate folders:
- `src/pages/*.jsx` files
- `src/components/*.jsx` files
- CSS files to respective locations
- `src/App.jsx`, `src/main.jsx`, `index.html`

### Step 5: Update Vite Configuration
Ensure `vite.config.js` contains proxy settings for API calls

### Step 6: Test Frontend
```bash
npm run dev
# Frontend should run on http://localhost:3000
```

---

## Database Setup

### Option 1: Local MongoDB

#### On Windows
```bash
# Install MongoDB Community Edition
# Then MongoDB will run as a service

# Or start manually:
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

#### On macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify
mongo --version
```

#### On Linux
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Whitelist your IP address
5. Create a database user
6. Get your connection string
7. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental?retryWrites=true&w=majority
```

### Step: Seed Sample Data
```bash
# From backend directory
npm run seed

# Output should show:
# ✓ Cleared existing data
# ✓ Added sample users
# ✓ Added sample cars
# ✅ Database seeding completed successfully!
```

#### Demo Credentials After Seeding
```
Regular User:
Email: user@example.com
Password: password123

Admin User:
Email: admin@example.com
Password: password123
```

---

## Running the Application

### Terminal 1: Start MongoDB
```bash
mongod
# Output: "Listening on 27017"
```

### Terminal 2: Start Backend
```bash
cd car-rental-backend
npm run dev
# Output: "Server running on port 5000"
#         "Connected to MongoDB"
```

### Terminal 3: Start Frontend
```bash
cd car-rental-frontend
npm run dev
# Output: "Local: http://localhost:3000"
#         "Press r to restart..."
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Login with demo credentials (see above)

---

## Important Files & Locations

### Backend Structure
```
backend/
├── server.js                 (Main Express server)
├── package.json             (Dependencies)
├── .env                     (Environment variables)
├── seed.js                  (Database seeding)
└── node_modules/            (Dependencies folder)
```

### Frontend Structure
```
frontend/
├── src/
│   ├── pages/              (All page components)
│   ├── components/         (Reusable components)
│   ├── App.jsx            (Main App component)
│   ├── main.jsx           (React entry point)
│   └── index.css          (Global styles)
├── index.html             (HTML template)
├── vite.config.js        (Vite configuration)
├── package.json          (Dependencies)
└── node_modules/         (Dependencies folder)
```

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env
3. Verify localhost:27017 is accessible
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution:
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000

# macOS/Linux:
lsof -i :5000

# Kill the process
# Windows:
taskkill /PID <process_id> /F

# macOS/Linux:
kill -9 <process_id>
```

### CORS Error
```
Error: Access to XMLHttpRequest has been blocked by CORS policy

Solution:
1. Ensure server.js has: app.use(cors());
2. Verify frontend is making requests to http://localhost:5000
3. Check vite.config.js has correct proxy settings
```

### Module Not Found
```
Error: Cannot find module 'axios'

Solution:
1. From frontend directory: npm install axios
2. Or: npm install (to install all dependencies)
3. Restart frontend server
```

### Seed Data Not Loading
```
Error: Seed command fails

Solution:
1. Ensure MongoDB is running
2. Verify .env has correct MONGODB_URI
3. Check node_modules is installed: npm install
4. Run from backend directory: npm run seed
```

---

## Production Build

### Frontend Production Build
```bash
cd frontend
npm run build

# Output: dist/ folder with optimized production files
```

### Deploy Frontend
```bash
# Option 1: Vercel
npm install -g vercel
vercel

# Option 2: Netlify
npm install -g netlify-cli
netlify deploy

# Option 3: GitHub Pages
npm run build
# Push to GitHub, enable GitHub Pages
```

### Deploy Backend
```bash
# Option 1: Heroku
npm install -g heroku-cli
heroku login
heroku create
git push heroku main

# Option 2: Railway
npx railway init
npx railway up

# Option 3: Render
# Connect GitHub, select main branch, deploy
```

---

## Environment Variables Checklist

### Backend (.env)
- [ ] MONGODB_URI (MongoDB connection string)
- [ ] JWT_SECRET (Secret for JWT tokens)
- [ ] PORT (Backend port, default 5000)
- [ ] NODE_ENV (development/production)

### Frontend (.env or vite.config.js)
- [ ] VITE_API_URL (Backend API URL, default http://localhost:5000)

---

## Testing the Application

### Test User Registration
1. Go to http://localhost:3000/register
2. Fill in all fields
3. Click "Create Account"
4. Should redirect to home page

### Test User Login
1. Go to http://localhost:3000/login
2. Use demo credentials
3. Should redirect to home page

### Test Car Browsing
1. Click "Browse All Cars"
2. Verify all cars are displayed
3. Try filters and search

### Test Booking
1. Click on a car
2. Click "Book Now"
3. Fill booking details
4. Confirm booking
5. Check dashboard for booking

### Test Admin Features
1. Login as admin
2. Go to Admin Panel
3. View statistics
4. Add a new car
5. Manage bookings

---

## Performance Tips

1. **Clear Browser Cache**
   ```bash
   # After updates
   Ctrl+Shift+Delete (Windows)
   Cmd+Shift+Delete (macOS)
   ```

2. **Check Network Tab**
   - F12 → Network Tab
   - Monitor API requests
   - Ensure < 100ms response time

3. **MongoDB Indexing**
   - Create indexes for frequently queried fields
   - Query optimization for large datasets

4. **Frontend Optimization**
   - Code splitting with React.lazy
   - Image compression
   - CSS optimization

---

## Common Commands

### Backend
```bash
npm start           # Production start
npm run dev         # Development with auto-reload
npm run seed        # Populate database
npm install         # Install dependencies
npm list            # List installed packages
npm update          # Update packages
```

### Frontend
```bash
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
npm install         # Install dependencies
npm run lint        # Check code quality
```

### Git
```bash
git init            # Initialize repository
git add .           # Stage all changes
git commit -m ""    # Commit changes
git push            # Push to remote
git pull            # Pull from remote
```

### MongoDB
```bash
mongod              # Start MongoDB server
mongosh             # Open MongoDB shell
show dbs            # List all databases
use car-rental      # Select database
db.cars.find()      # Query cars collection
db.users.find()     # Query users collection
```

---

## Getting Help

- **Documentation**: Check README.md
- **API Reference**: See api.md (if available)
- **GitHub Issues**: Create an issue for bugs
- **Stack Overflow**: Search for similar issues
- **Email Support**: info@rentflow.com

---

## Next Steps

1. ✅ Complete setup following this guide
2. ✅ Test all features thoroughly
3. ✅ Customize branding and colors
4. ✅ Add payment gateway integration
5. ✅ Deploy to production
6. ✅ Monitor and optimize
7. ✅ Add more features based on feedback

---

**Happy coding! 🚗✨**
