# 🚗 RentFlow – Car Rental Management System

A modern, full‑stack car rental platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
It features user authentication, car booking, driver assignment, invoice generation, payment tracking, reminders, and a powerful admin dashboard.

**Live Demo:**  
- Frontend: [https://rentflow-car-rental.vercel.app](https://rentflow-car-rental.vercel.app)  
- Backend API: [https://rentflow-car-rental-2.onrender.com](https://rentflow-car-rental-2.onrender.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Quick Start (Local Development)](#-quick-start-local-development)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👤 User Features
- **Browse Cars** – View all available cars with search and filters (price, fuel, seating).
- **Car Details** – See comprehensive specifications, features, and availability.
- **Easy Booking** – Select dates, location, rental type (self‑drive / with driver), and optional driver.
- **Booking History** – View, track, and cancel bookings from the dashboard.
- **User Dashboard** – Manage profile and booking history.
- **Responsive Design** – Optimized for mobile, tablet, and desktop.

### 👨‍💼 Admin Features
- **Dashboard Analytics** – Overview of total cars, bookings, revenue, customers, and drivers.
- **Car Management** – Add, edit, and delete vehicles.
- **Booking Management** – View all bookings and update their status (pending, confirmed, completed, cancelled).
- **Driver Management** – Add, edit, delete, and track driver availability.
- **Invoice Generation** – Generate invoices from completed bookings.
- **Payment Tracking** – Record and manage payments.
- **Reminder System** – Create and manage booking reminders.
- **User Management** – View all registered users.

### 🔐 Security
- Password hashing with bcrypt.
- JWT‑based authentication (7‑day expiry).
- Protected routes (user / admin roles).
- CORS configuration for secure cross‑origin requests.
- Environment variables for sensitive data.

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Other:** cors, dotenv, multer

### Frontend
- **Library:** React 18 (Vite)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** Vanilla CSS with CSS variables
- **Fonts:** Google Fonts (Inter, Space Grotesk, Space Mono)

### Deployment
- **Backend:** Render (Node.js Web Service)
- **Frontend:** Vercel (Static Site)

---

## 📁 Project Structure
rentflow-car-rental/
├── backend/
│ ├── models/
│ │ ├── Booking.js
│ │ ├── Driver.js
│ │ ├── Invoice.js
│ │ ├── Payment.js
│ │ └── Reminder.js
│ ├── routes/
│ │ ├── drivers.js
│ │ ├── invoices.js
│ │ ├── payments.js
│ │ └── reminders.js
│ ├── middleware/
│ │ ├── auth.js
│ │ └── admin.js
│ ├── server.js
│ ├── seed.js
│ ├── package.json
│ └── .env (not committed)
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Cars.jsx
│ │ │ ├── CarDetails.jsx
│ │ │ ├── Booking.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── UserDashboard.jsx
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── AdminBookings.jsx
│ │ │ ├── AdminUsers.jsx
│ │ │ ├── Drivers.jsx
│ │ │ ├── Invoices.jsx
│ │ │ ├── Payments.jsx
│ │ │ ├── Reminders.jsx
│ │ │ └── (Legal pages: Terms, Privacy, Contact)
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── ProtectedRoute.jsx
│ │ │ └── ChatAssistant.jsx
│ │ ├── context/
│ │ │ └── ToastContext.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── public/
│ │ └── images/ (car images & background)
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
├── render.yaml (optional, for Render Blueprint)
├── .gitignore
└── README.md

text

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Dhanush-ux177/rentflow-car-rental.git
cd rentflow-car-rental
2. Backend Setup
bash
cd backend
npm install
Create a .env file in the backend/ folder:

env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key
PORT=5000
NODE_ENV=development
Seed the database with sample cars and users:

bash
npm run seed
Start the backend server:

bash
npm run dev
The API runs at http://localhost:5000.

3. Frontend Setup
Open a new terminal:

bash
cd frontend
npm install
Create a .env file in the frontend/ folder (optional for local development):

env
VITE_API_URL=http://localhost:5000
Start the frontend development server:

bash
npm run dev
The React app runs at http://localhost:3000.

4. Demo Credentials
Role	Email	Password
User	user@example.com	password123
Admin	admin@example.com	password123
🔐 Environment Variables
Backend (.env)
Variable	Description
MONGODB_URI	MongoDB connection string
JWT_SECRET	Secret for signing JWT tokens
PORT	Port for the server (default: 5000)
NODE_ENV	development or production
Frontend (.env – optional)
Variable	Description
VITE_API_URL	Backend API URL (for local dev)
🌐 Deployment
Backend (Render)
Push your code to GitHub.

On Render, create a Web Service and connect your repository.

Set Root Directory to backend.

Build Command: npm install

Start Command: npm start

Add environment variables: MONGODB_URI and JWT_SECRET.

Deploy.

Frontend (Vercel)
On Vercel, import your GitHub repository.

Set Framework Preset to Vite.

Set Root Directory to frontend.

Add environment variable: VITE_API_URL = your Render backend URL.

Deploy – Vercel auto‑deploys on every push to the main branch.

📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Cars
Method	Endpoint	Description
GET	/api/cars	Get all cars (with filters)
GET	/api/cars/:id	Get single car
POST	/api/cars	Add car (admin)
PUT	/api/cars/:id	Update car (admin)
DELETE	/api/cars/:id	Delete car (admin)
Bookings
Method	Endpoint	Description
POST	/api/bookings	Create booking
GET	/api/bookings/user/:userId	Get user bookings
GET	/api/bookings	Get all bookings (admin)
PUT	/api/bookings/:id	Update booking (admin)
PUT	/api/bookings/:id/cancel	Cancel booking (user)
Admin
Method	Endpoint	Description
GET	/api/admin/stats	Dashboard statistics
GET	/api/users	Get all users
Drivers, Invoices, Payments, Reminders
All CRUD operations are available under /api/drivers, /api/invoices, /api/payments, /api/reminders (admin only).

🖼️ Screenshots
(Add your own screenshots here)

Homepage	Car Listing	Booking
https://./screenshots/home.png	https://./screenshots/cars.png	https://./screenshots/booking.png
Admin Dashboard	Booking Management	User Management
https://./screenshots/admin.png	https://./screenshots/admin-bookings.png	https://./screenshots/admin-users.png
🤝 Contributing
Fork the repository.

Create a new branch (git checkout -b feature/amazing-feature).

Make your changes and commit (git commit -m 'Add some amazing feature').

Push to the branch (git push origin feature/amazing-feature).

Open a Pull Request.

📄 License
This project is open‑source and available under the MIT License.

🙏 Acknowledgments
Built with ❤️ using the MERN stack.

Fonts and design inspiration from Google Fonts and modern UI trends.

Special thanks to all contributors and testers.

Last Updated: August 2026
Version: 2.0.0
Status: ✅ Production‑Ready

🚗 RentFlow – Drive Your Dream Car.

text

---

## ✅ How to use

1. Create a new file named `README.md` in the **root of your project**.
2. Copy the entire content above and paste it.
3. Replace the placeholder screenshot paths with actual images (you can add a `screenshots/` folder).
4. Commit and push.

Your repository will now have a polished, professional README perfect for college submission. Good luck! 🚀
