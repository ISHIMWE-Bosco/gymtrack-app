// ============================================================================
// 🔧 BACKEND - Workout API Routes (Express Router)
// ============================================================================
// This file handles all workout-related API endpoints:
// - GET /workouts - Retrieve all workouts
// - POST /workouts - Create new workout
// - GET /workouts/:id - Get specific workout
// - DELETE /workouts/:id - Delete workout
// ============================================================================

const express = require("express")
const router = express.Router()

// 💾 BACKEND DATA STORAGE - In-memory database (replace with real DB in production)
const workouts = [
  {
    id: "1",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { reps: 10, weight: 135 },
          { reps: 8, weight: 155 },
          { reps: 6, weight: 175 },
        ],
      },
      {
        name: "Squat",
        sets: [
          { reps: 12, weight: 185 },
          { reps: 10, weight: 205 },
          { reps: 8, weight: 225 },
        ],
      },
    ],
  },
  {
    id: "2",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    exercises: [
      {
        name: "Deadlift",
        sets: [
          { reps: 8, weight: 225 },
          { reps: 6, weight: 275 },
          { reps: 4, weight: 315 },
        ],
      },
      {
        name: "Pull-ups",
        sets: [
          { reps: 10, weight: 0 },
          { reps: 8, weight: 25 },
          { reps: 6, weight: 45 },
        ],
      },
    ],
  },
]

// 📡 BACKEND API ENDPOINT - GET /workouts
// Purpose: Return all workouts to frontend
router.get("/", (req, res) => {
  try {
    console.log("🔧 Backend: GET /workouts - Sending all workouts to frontend")
    res.json(workouts)
  } catch (error) {
    console.error("🔧 Backend Error:", error)
    res.status(500).json({ error: "Failed to fetch workouts" })
  }
})

// 📡 BACKEND API ENDPOINT - POST /workouts
// Purpose: Create new workout from frontend data
router.post("/", (req, res) => {
  try {
    const workout = req.body
    console.log("🔧 Backend: POST /workouts - Received new workout from frontend:", workout)

    // 🔧 BACKEND VALIDATION
    if (!workout.exercises || workout.exercises.length === 0) {
      return res.status(400).json({ error: "Workout must have at least one exercise" })
    }

    if (!workout.duration || workout.duration <= 0) {
      return res.status(400).json({ error: "Workout duration must be greater than 0" })
    }

    // 🔧 BACKEND BUSINESS LOGIC - Generate ID and save
    const newWorkout = {
      id: Date.now().toString(),
      ...workout,
    }

    workouts.push(newWorkout)
    console.log("🔧 Backend: Workout saved successfully with ID:", newWorkout.id)

    res.status(201).json(newWorkout)
  } catch (error) {
    console.error("🔧 Backend Error:", error)
    res.status(400).json({ error: "Invalid request data" })
  }
})

// 📡 BACKEND API ENDPOINT - GET /workouts/:id
// Purpose: Get specific workout by ID
router.get("/:id", (req, res) => {
  try {
    const workout = workouts.find((w) => w.id === req.params.id)
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" })
    }
    console.log("🔧 Backend: GET /workouts/:id - Found workout:", workout.id)
    res.json(workout)
  } catch (error) {
    console.error("🔧 Backend Error:", error)
    res.status(500).json({ error: "Failed to fetch workout" })
  }
})

// 📡 BACKEND API ENDPOINT - DELETE /workouts/:id
// Purpose: Delete workout by ID
router.delete("/:id", (req, res) => {
  try {
    const index = workouts.findIndex((w) => w.id === req.params.id)
    if (index === -1) {
      return res.status(404).json({ error: "Workout not found" })
    }

    const deletedWorkout = workouts.splice(index, 1)[0]
    console.log("🔧 Backend: DELETE /workouts/:id - Deleted workout:", deletedWorkout.id)

    res.json({ message: "Workout deleted successfully", workout: deletedWorkout })
  } catch (error) {
    console.error("🔧 Backend Error:", error)
    res.status(500).json({ error: "Failed to delete workout" })
  }
})

module.exports = router
