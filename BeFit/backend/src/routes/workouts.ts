import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../database/connection.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all workouts for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const workoutsResult = await pool.query(`
      SELECT 
        w.id, w.date, w.duration, w.notes, w.total_volume,
        json_agg(
          json_build_object(
            'exerciseId', we.exercise_id,
            'exerciseName', e.name,
            'notes', we.notes,
            'sets', we.sets
          )
        ) as exercises
      FROM workouts w
      LEFT JOIN (
        SELECT 
          we.workout_id,
          we.exercise_id,
          we.notes,
          e.name,
          json_agg(
            json_build_object(
              'reps', ws.reps,
              'weight', ws.weight,
              'restTime', ws.rest_time
            ) ORDER BY ws.created_at
          ) as sets
        FROM workout_exercises we
        JOIN exercises e ON we.exercise_id = e.id
        LEFT JOIN workout_sets ws ON we.id = ws.workout_exercise_id
        GROUP BY we.workout_id, we.exercise_id, we.notes, e.name
      ) we ON w.id = we.workout_id
      JOIN exercises e ON we.exercise_id = e.id
      WHERE w.user_id = $1
      GROUP BY w.id, w.date, w.duration, w.notes, w.total_volume
      ORDER BY w.date DESC
      LIMIT $2 OFFSET $3
    `, [req.user.userId, limit, offset]);

    const workouts = workoutsResult.rows.map(row => ({
      id: row.id,
      userId: req.user.userId,
      date: row.date,
      duration: row.duration,
      notes: row.notes,
      totalVolume: parseFloat(row.total_volume),
      exercises: row.exercises.filter(ex => ex.exerciseId !== null)
    }));

    res.json(workouts);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new workout
router.post('/', [
  authenticateToken,
  body('date').isISO8601(),
  body('duration').isInt({ min: 1 }),
  body('exercises').isArray({ min: 1 }),
  body('exercises.*.exerciseId').isUUID(),
  body('exercises.*.sets').isArray({ min: 1 })
], async (req, res) => {
  const client = await pool.connect();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await client.query('BEGIN');

    const { date, duration, notes, exercises } = req.body;

    // Calculate total volume
    const totalVolume = exercises.reduce((total: number, exercise: any) => {
      return total + exercise.sets.reduce((exerciseTotal: number, set: any) => {
        return exerciseTotal + (set.reps * set.weight);
      }, 0);
    }, 0);

    // Create workout
    const workoutResult = await client.query(
      'INSERT INTO workouts (user_id, date, duration, notes, total_volume) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [req.user.userId, date, duration, notes, totalVolume]
    );

    const workoutId = workoutResult.rows[0].id;

    // Add exercises and sets
    for (const exercise of exercises) {
      const workoutExerciseResult = await client.query(
        'INSERT INTO workout_exercises (workout_id, exercise_id, notes) VALUES ($1, $2, $3) RETURNING id',
        [workoutId, exercise.exerciseId, exercise.notes]
      );

      const workoutExerciseId = workoutExerciseResult.rows[0].id;

      // Add sets
      for (const set of exercise.sets) {
        await client.query(
          'INSERT INTO workout_sets (workout_exercise_id, reps, weight, rest_time) VALUES ($1, $2, $3, $4)',
          [workoutExerciseId, set.reps, set.weight, set.restTime]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Workout created successfully',
      workoutId
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create workout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Delete workout
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM workouts WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;