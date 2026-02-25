# 🌿 FoodBridge — Food Waste Reduction Platform

A production-ready full-stack platform connecting **Event Organizers** with **NGOs** to reduce food waste. Organizers list surplus food from events; NGOs browse and claim it for community distribution.

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Network                           │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │───▶│   Backend    │───▶│   MongoDB    │  │
│  │ React + Vite │    │ Express.js   │    │   Docker     │  │
│  │ Nginx :3000  │    │ Node :5000   │    │ Container    │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Tech Stack:**
- **Frontend:** React 18, Vite, Tailwind CSS, Axios, React Router v6
- **Backend:** Node.js, Express.js, JWT, bcryptjs, express-validator
- **Database:** MongoDB 7 (Docker), Mongoose ODM
- **Infra:** Docker Compose, Nginx (frontend serving)

---

## 📁 Project Structure

```
food-waste-platform/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js                  # Express app setup
│       ├── server.js               # Entry point
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── models/
│       │   ├── User.js
│       │   ├── Event.js
│       │   └── Booking.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── eventController.js
│       │   ├── bookingController.js
│       │   └── adminController.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── eventRoutes.js
│       │   ├── bookingRoutes.js
│       │   └── adminRoutes.js
│       ├── middleware/
│       │   ├── auth.js             # JWT protect + role authorize
│       │   ├── errorHandler.js     # Centralized error handling
│       │   └── validate.js         # express-validator runner
│       └── utils/
│           └── generateToken.js
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── .env.example
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── api/
        │   ├── axiosInstance.js    # Axios with JWT interceptor
        │   ├── auth.js
        │   ├── events.js
        │   ├── bookings.js
        │   └── admin.js
        ├── context/
        │   └── AuthContext.jsx     # Auth state management
        ├── routes/
        │   └── ProtectedRoute.jsx  # Role-aware guard
        ├── components/
        │   ├── Navbar.jsx
        │   ├── EventCard.jsx
        │   ├── EventForm.jsx
        │   ├── Toast.jsx
        │   └── LoadingSpinner.jsx
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── Dashboard.jsx
            ├── CreateEvent.jsx
            ├── MyEvents.jsx
            ├── BrowseEvents.jsx
            ├── MyBookings.jsx
            ├── AdminPages.jsx
            └── NotFound.jsx
```

---

## 🚀 Quick Start

###  Docker Compose 

```bash
# Clone / navigate to the project
cd food-waste-platform

# Copy env file (optional — defaults work for Docker)
cp backend/.env.example backend/.env

# Build and launch all services
docker-compose up --build

# Access the app:
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# API docs: http://localhost:5000/health
```

To run in background:
```bash
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Stop and remove volumes (wipes MongoDB data)
docker-compose down -v
```



## 🌍 Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | — | MongoDB connection string |
| `JWT_SECRET` | — | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `NODE_ENV` | `development` | Environment mode |
| `FRONTEND_URL` | `http://localhost:5173` | CORS origin |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:5000` | Backend base URL |



## 🐳 Docker Services

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `mongo` | `mongo:7.0` | internal | MongoDB database |
| `backend` | custom | `5000` | Express API server |
| `frontend` | custom (Nginx) | `3000` | React SPA |

Data is persisted in a named Docker volume `mongo_data`.



