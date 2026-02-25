# 🌿 FoodBridge — Food Waste Reduction Platform

A production-ready full-stack web application that connects **Event Organizers** with **NGOs** to reduce food waste. Organizers list surplus food from events; NGOs browse and claim it for community distribution.

> DevOps-enabled full-stack application deployed on AWS using Docker and GitHub Actions CI/CD with automated version-based container releases.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Axios, React Router v6 |
| **Backend** | Node.js, Express.js, JWT, bcryptjs, express-validator |
| **Database** | MongoDB 7 (Docker), Mongoose ODM |
| **DevOps & Cloud** | Docker, Docker Compose, GitHub Actions, AWS EC2 (Ubuntu) |

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

**CI/CD Flow:**
```
Git Tag → GitHub Actions → Build Docker Images → Push to Docker Hub → SSH to EC2 → Pull Images → Restart Containers
```

---

## 🔐 Core Features

**Authentication**
- User registration as Organizer or NGO
- Login with JWT
- Protected routes and role-based authorization

**Organizer**
- Create, update, and delete events
- View own events

**NGO**
- Browse available food events
- Claim food (one claim per event)
- View claimed bookings

---


## 🐳 Docker Setup

All services are containerized and managed via Docker Compose. MongoDB runs with a persistent named volume (`mongo_data`), and the backend connects using the internal Docker hostname.

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `mongo` | `mongo:7.0` | internal | MongoDB database |
| `backend` | custom | `5000` | Express API server |
| `frontend` | custom (Nginx) | `3000` | React SPA |

**Run locally:**

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
# Health:   http://localhost:5000/health
```

**Run in background:**

```bash
docker-compose up --build -d

docker-compose logs -f       # View logs
docker-compose down          # Stop everything
docker-compose down -v       # Stop and wipe MongoDB data
```

---

## ☁️ AWS Deployment

Deployed on an **AWS EC2 Ubuntu** instance.

**Steps performed:**
1. Created EC2 instance and configured security groups
2. Installed Docker and Docker Compose
3. Cloned the project repository
4. Configured `docker-compose.yml` with production environment variables
5. Started containers in detached mode

Application is accessible via the EC2 public IP.

---

## 🔄 CI/CD Pipeline

GitHub Actions workflow triggers automatically on version tag push — no manual SSH required.

**Trigger:**

```bash
git tag v1.0.X
git push origin v1.0.X
```

**Pipeline Stages:**
1. Checkout repository
2. Build Docker images
3. Tag images with semantic version
4. Push images to Docker Hub
5. SSH into EC2
6. Pull latest images
7. Restart containers

**Docker Hub Images:**

```
deepakm06/backend:v1.0.X
deepakm06/frontend:v1.0.X
deepakm06/backend:latest
deepakm06/frontend:latest
```

---

