# 🚗 RentFlow – Complete Car Rental Management System

A modern, full‑stack car rental platform built with **React (Vite)**, **Node.js/Express**, and **MongoDB**. Features user authentication, booking management, driver assignment, invoice generation, payment tracking, reminders, AI assistant, and a comprehensive admin dashboard.

![RentFlow Screenshot](https://via.placeholder.com/1000x500?text=RentFlow+Car+Rental+System)

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Technology Stack](#%EF%B8%8F-technology-stack)
3. [Project Structure](#-project-structure)
4. [Quick Start](#-quick-start)
5. [Demo Credentials](#-demo-credentials)
6. [API Endpoints](#-api-endpoints)
7. [AI Assistant](#-ai-assistant)
8. [Responsive Design](#-responsive-design)
9. [Troubleshooting](#-troubleshooting)
10. [Deployment](#-deployment)
11. [Contributing](#-contributing)
12. [License](#-license)

---

## ✨ Features

### 👤 User Features
| Feature | Description |
|---------|-------------|
| **Browse Cars** | View all available cars with search and filters (price, fuel, seating) |
| **Detailed View** | See comprehensive car information and specifications |
| **Easy Booking** | Simple booking process with date and location selection |
| **Rental Options** | Choose between **Self Drive** or **With Driver** |
| **Driver Selection** | Select available drivers when booking |
| **Manage Bookings** | View, track, and cancel bookings |
| **User Dashboard** | Profile management and booking history |
| **Responsive Design** | Works seamlessly on mobile, tablet, and desktop |
| **AI Assistant** | Smart chatbot for instant help |

### 👨‍💼 Admin Features
| Feature | Description |
|---------|-------------|
| **Dashboard Analytics** | View comprehensive statistics and metrics |
| **Booking Management** | Update booking statuses and manage all orders |
| **Car Management** | Add, edit, and delete vehicles |
| **Driver Management** | Add, edit, delete, and track driver availability |
| **User Management** | View all registered users and their details |
| **Invoice Generation** | Generate invoices from completed bookings |
| **Payment Tracking** | Record and track payments for bookings |
| **Reminder System** | Create and manage booking reminders |
| **Revenue Tracking** | Monitor total revenue and completed bookings |
| **AI Assistant** | Smart chatbot for admin queries (stats, recent bookings) |

### 🤖 AI Assistant
- **Rule‑based responses** – Handles common queries about cars, bookings, and stats
- **Gemini AI integration** – Optional upgrade for smarter, context‑aware responses
- **Admin‑specific commands** – `"stats"`, `"recent bookings"` for admins
- **Navigation actions** – Can guide users to car details pages

### 🔐 Security Features
- Secure password hashing with bcryptjs
- JWT token‑based authentication (7‑day expiry)
- Protected routes with role‑based access (User / Admin)
- Input validation on frontend and backend
- CORS protection
- Environment variable management

---

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework for REST APIs |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB (schemas, models, queries) |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **cors** | Cross‑origin resource sharing |
| **dotenv** | Environment variables |
| **multer** | File upload (for future features) |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Fast bundler and dev server |
| **React Router v6** | Client‑side routing |
| **Axios** | HTTP client for API calls |
| **Context API** | Global state management (Toast notifications) |
| **CSS Variables** | Theming and styling |
| **Poppins Font** | Modern typography |

### Development & Deployment
- **Git** – Version control
- **VS Code** – Recommended editor
- **MongoDB Compass** – Database GUI
- **Postman** – API testing
- **Render / Vercel / Netlify** – Deployment platforms

---

## 📁 Project Structure
rentflow-car-rental/
│
├── backend/
│ ├── server.js # Main Express server (all endpoints)
│ ├── package.json # Dependencies
│ ├── .env # Environment variables (never commit!)
│ ├── seed.js # Database seeding script
│ │
│ ├── models/ # Mongoose schemas
│ │ ├── Booking.js
│ │ ├── Car.js (optional – defined inline in server.js)
│ │ ├── Driver.js
│ │ ├── Invoice.js
│ │ ├── Payment.js
│ │ └── Reminder.js
│ │
│ ├── routes/ # API route handlers
│ │ ├── ai.js
│ │ ├── drivers.js
│ │ ├── invoices.js
│ │ ├── payments.js
│ │ └── reminders.js
│ │
│ └── middleware/ # Custom middleware
│ ├── auth.js
│ └── admin.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/ # All page components
│ │ │ ├── Home.jsx
│ │ │ ├── Home.css
│ │ │ ├── Cars.jsx
│ │ │ ├── Cars.css
│ │ │ ├── CarDetails.jsx
│ │ │ ├── CarDetails.css
│ │ │ ├── Booking.jsx
│ │ │ ├── Booking.css
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Auth.css
│ │ │ ├── UserDashboard.jsx
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── AdminBookings.jsx
│ │ │ ├── AdminUsers.jsx
│ │ │ ├── Drivers.jsx
│ │ │ ├── Invoices.jsx
│ │ │ ├── Payments.jsx
│ │ │ ├── Reminders.jsx
│ │ │ ├── Dashboard.css
│ │ │ ├── Terms.jsx
│ │ │ ├── Terms.css
│ │ │ ├── Privacy.jsx
│ │ │ ├── Privacy.css
│ │ │ ├── Contact.jsx
│ │ │ └── Contact.css
│ │ │
│ │ ├── components/ # Reusable components
│ │ │ ├── Navbar.jsx
│ │ │ ├── Navbar.css
│ │ │ ├── Footer.jsx
│ │ │ ├── Footer.css
│ │ │ ├── ProtectedRoute.jsx
│ │ │ └── ChatAssistant.jsx
│ │ │
│ │ ├── context/ # React Context providers
│ │ │ └── ToastContext.jsx
│ │ │
│ │ ├── App.jsx
│ │ ├── App.css
│ │ ├── main.jsx
│ │ └── index.css
│ │
│ ├── public/
│ │ └── images/ # Static images
│ │ └── inspire-bg.jpg
│ │
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── .gitignore
└── README.md

text

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) – [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas) – [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn**
- **Git** (for cloning)

---

### Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy the template below)
# MONGODB_URI=mongodb://localhost:27017/car-rental
# JWT_SECRET=your-super-secret-jwt-key
# PORT=5000
# NODE_ENV=development

# Start MongoDB (local installation)
mongod

# Seed the database (populate with sample cars and users)
npm run seed

# Start the backend server
npm run dev
Backend runs on: http://localhost:5000

Frontend Setup
bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
Frontend runs on: http://localhost:3000

Access the Application
Open your browser and go to: http://localhost:3000

Login with demo credentials (see below)

🔑 Demo Credentials
Role	Email	Password
Regular User	user@example.com	password123
Admin User	admin@example.com	password123
📊 API Endpoints
Authentication
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user	No
POST	/api/auth/login	Login user	No
Cars
Method	Endpoint	Description	Auth
GET	/api/cars	Get all cars (with filters)	No
GET	/api/cars/:id	Get single car	No
POST	/api/cars	Add car	Admin
PUT	/api/cars/:id	Update car	Admin
DELETE	/api/cars/:id	Delete car	Admin
Bookings
Method	Endpoint	Description	Auth
POST	/api/bookings	Create booking	User
GET	/api/bookings/user/:userId	Get user bookings	User/Admin
GET	/api/bookings	Get all bookings	Admin
PUT	/api/bookings/:id	Update booking	Admin
PUT	/api/bookings/:id/cancel	Cancel booking	User
Admin
Method	Endpoint	Description	Auth
GET	/api/admin/stats	Dashboard statistics	Admin
GET	/api/users	Get all users	Admin
Drivers, Invoices, Payments, Reminders
Method	Endpoint	Description	Auth
CRUD	/api/drivers	Manage drivers	Admin
CRUD	/api/invoices	Manage invoices	Admin
CRUD	/api/payments	Manage payments	Admin
CRUD	/api/reminders	Manage reminders	Admin
