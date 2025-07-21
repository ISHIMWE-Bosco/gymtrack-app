// ============================================================================
// 🔧 BACKEND - BeFit API Server (Node.js/Express)
// ============================================================================
// This is the main backend server that handles:
// - HTTP API endpoints for workout data
// - Data storage and retrieval
// - Business logic and validation
// - CORS for frontend communication
// ============================================================================

const express = require("express")
const cors = require("cors")
const workoutRoutes = require("./routes/workouts")

const app = express()
const PORT = process.env.PORT || 5000

// 🔧 BACKEND MIDDLEWARE
app.use(cors()) // Allow frontend to communicate with backend
app.use(express.json()) // Parse JSON request bodies

// 🔧 BACKEND ROUTES
app.use("/workouts", workoutRoutes)

// 🔧 BACKEND HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    status: "🔧 Backend server is running",
    timestamp: new Date().toISOString(),
    port: PORT,
  })
})

// 🔧 BACKEND SERVER START
app.listen(PORT, () => {
  console.log(`🔧 Backend server running on http://localhost:${PORT}`)
  console.log(`🔧 Health check: http://localhost:${PORT}/health`)
  console.log(`🔧 Workouts API: http://localhost:${PORT}/workouts`)
})
