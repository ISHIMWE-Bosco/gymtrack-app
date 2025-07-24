# 🏋️‍♂️ BeFit – Workout Progress Tracker

**BeFit** is a lightweight web application that helps users log and track their gym workouts — including exercises, sets, reps, and weights — while visualizing progress over time. It’s designed as a practical, minimal fitness tracker that’s easy to use and extendable.

This project also serves as a DevOps learning sandbox, applying CI/CD pipelines, containerization, and infrastructure-as-code principles.

---

## 🚀 Features

- ✅ Register/Login with token-based authentication
- 📝 Log exercises with sets, reps, and weights
- 📅 View past workouts in a history log
- 📈 Track progress over time with interactive charts
- ⚙️ CI pipeline for linting and testing (GitHub Actions)
- 🐳 Dockerized backend for easy deployment

---

## 🧱 Tech Stack

| Layer     | Tools                       |
|-----------|-----------------------------|
| Backend   | Node.js, Express.js         |
| Frontend  | React.js (or Vue/Svelte)    |
| Database  | PostgreSQL                  |
| CI/CD     | GitHub Actions              |
| Auth      | JWT (JSON Web Tokens)       |
| DevOps    | Docker, Terraform (optional)|
| Charts    | Chart.js or Recharts        |

---
## 📁 Project Structure

```
befit-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── types/         # TypeScript types
│   │   ├── data/          # Static data
│   │   └── main.tsx       # Entry point
│   ├── public/            # Static assets
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   └── vite.config.ts     # Vite configuration
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── database/      # Database config & schema
│   │   └── server.ts      # Main server file
│   ├── .env.example       # Environment variables template
│   └── package.json       # Backend dependencies
├── supabase/              # Database migrations
│   └── migrations/        # SQL migration files
├── package.json           # Root package.json with scripts
└── README.md              # This file
```

## 🧑‍💻 Local Development Setup

### 🔧 Prerequisites

Make sure you have the following installed:
- Node.js (v18+)
- npm or yarn
- Git
- Docker (optional but recommended)
- PostgreSQL (local or Docker)

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/gymtrack-app.git
cd gymtrack-app
```

---

## 🔙 2. Set Up the Backend


cd backend
npm install
### Create a .env file:
PORT=3000
DATABASE_URL=postgres://youruser:yourpass@localhost:5432/gymtrack
JWT_SECRET=your_secret_key
### Run the server:

npm run start
### Test it:
curl http://localhost:3000/workouts

---

## 🧪 3. Run Lint & Tests

npm run lint
npm run test

---

## 🐳 Dockerization Process

The **befit-app** was containerized using Docker to ensure consistent environment setup and simplify deployment.

### 🔧 Steps Taken:

1. **Created Dockerfiles** for both the frontend and backend:
   - `frontend/Dockerfile` — built the React frontend using a multi-stage build with `node:alpine` and `nginx`.
   - `backend/Dockerfile` — built the Node.js + Express backend with `node:alpine`.

2. **Docker Images** were built locally:
   ```bash
   docker build -t befit-frontend ./frontend
   docker build -t befit-backend ./backend
Tagged the images for Azure Container Registry (ACR):


docker tag befit-frontend ishimweregistry.azurecr.io/befit-frontend:latest
docker tag befit-backend ishimweregistry.azurecr.io/befit-backend:latest
Pushed images to ACR:


docker push ishimweregistry.azurecr.io/befit-frontend:latest
docker push ishimweregistry.azurecr.io/befit-backend:latest
Configured Azure Web App for Containers to use the pushed image:

# Selected Azure Container Registry as the image source.

# Assigned AcrPull role to the Web App’s Managed Identity.

# Restarted the Web App to allow Azure to pull the image successfully.

# This setup enables smooth CI/CD-ready deployments and simplifies scaling in the cloud.

---

## 🖼️ 5. Frontend Setup (If applicable)
cd ../frontend
npm install
npm run dev
Configure API URL in .env or config.js as needed.

---

## ✅ CI/CD
GitHub Actions is used to:
Lint code using ESLint
Run unit tests with Jest
Trigger pipeline on all pull requests to main or develop
See .github/workflows/ci.yml for details.

---

## 📌 Project Status
This is a work-in-progress application for a DevOps course project.
Major tasks ahead:
 Add user registration/login
 Connect frontend to backend API
 Deploy to cloud (Render or AWS)
 Add container orchestration and monitoring

---

## 📄 License
MIT License. Feel free to fork, extend, and improve the project.

---

## 👨‍💻 Author
Created by Bosco Ishimwe as part of a DevOps learning project.
