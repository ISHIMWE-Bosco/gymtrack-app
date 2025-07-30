import pool from './connection.js';
import { logger } from '../utils/logger.js';

// Exercise data for seeding
const exerciseDatabase = [
  // Chest
  { id: 'bench-press', name: 'Bench Press', category: 'chest', muscleGroups: ['Chest', 'Triceps', 'Front Deltoids'] },
  { id: 'incline-bench-press', name: 'Incline Bench Press', category: 'chest', muscleGroups: ['Upper Chest', 'Triceps', 'Front Deltoids'] },
  { id: 'dumbbell-press', name: 'Dumbbell Press', category: 'chest', muscleGroups: ['Chest', 'Triceps', 'Front Deltoids'] },
  { id: 'push-ups', name: 'Push-ups', category: 'chest', muscleGroups: ['Chest', 'Triceps', 'Core'] },
  { id: 'dips', name: 'Dips', category: 'chest', muscleGroups: ['Chest', 'Triceps', 'Front Deltoids'] },
  { id: 'chest-fly', name: 'Chest Fly', category: 'chest', muscleGroups: ['Chest', 'Front Deltoids'] },

  // Back
  { id: 'deadlift', name: 'Deadlift', category: 'back', muscleGroups: ['Lower Back', 'Glutes', 'Hamstrings', 'Traps'] },
  { id: 'pull-ups', name: 'Pull-ups', category: 'back', muscleGroups: ['Lats', 'Rhomboids', 'Biceps'] },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'back', muscleGroups: ['Lats', 'Rhomboids', 'Biceps'] },
  { id: 'barbell-row', name: 'Barbell Row', category: 'back', muscleGroups: ['Middle Traps', 'Rhomboids', 'Rear Deltoids'] },
  { id: 'dumbbell-row', name: 'Dumbbell Row', category: 'back', muscleGroups: ['Lats', 'Rhomboids', 'Rear Deltoids'] },
  { id: 'cable-row', name: 'Cable Row', category: 'back', muscleGroups: ['Middle Traps', 'Rhomboids', 'Rear Deltoids'] },

  // Shoulders
  { id: 'shoulder-press', name: 'Shoulder Press', category: 'shoulders', muscleGroups: ['Front Deltoids', 'Side Deltoids', 'Triceps'] },
  { id: 'lateral-raise', name: 'Lateral Raise', category: 'shoulders', muscleGroups: ['Side Deltoids'] },
  { id: 'rear-delt-fly', name: 'Rear Delt Fly', category: 'shoulders', muscleGroups: ['Rear Deltoids', 'Rhomboids'] },
  { id: 'front-raise', name: 'Front Raise', category: 'shoulders', muscleGroups: ['Front Deltoids'] },
  { id: 'upright-row', name: 'Upright Row', category: 'shoulders', muscleGroups: ['Side Deltoids', 'Traps'] },
  { id: 'arnold-press', name: 'Arnold Press', category: 'shoulders', muscleGroups: ['All Deltoids', 'Triceps'] },

  // Arms
  { id: 'bicep-curl', name: 'Bicep Curl', category: 'arms', muscleGroups: ['Biceps'] },
  { id: 'hammer-curl', name: 'Hammer Curl', category: 'arms', muscleGroups: ['Biceps', 'Brachialis'] },
  { id: 'tricep-extension', name: 'Tricep Extension', category: 'arms', muscleGroups: ['Triceps'] },
  { id: 'close-grip-bench-press', name: 'Close Grip Bench Press', category: 'arms', muscleGroups: ['Triceps', 'Chest'] },
  { id: 'preacher-curl', name: 'Preacher Curl', category: 'arms', muscleGroups: ['Biceps'] },
  { id: 'tricep-dips', name: 'Tricep Dips', category: 'arms', muscleGroups: ['Triceps', 'Chest'] },

  // Legs
  { id: 'squat', name: 'Squat', category: 'legs', muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
  { id: 'leg-press', name: 'Leg Press', category: 'legs', muscleGroups: ['Quadriceps', 'Glutes'] },
  { id: 'leg-extension', name: 'Leg Extension', category: 'legs', muscleGroups: ['Quadriceps'] },
  { id: 'leg-curl', name: 'Leg Curl', category: 'legs', muscleGroups: ['Hamstrings'] },
  { id: 'calf-raise', name: 'Calf Raise', category: 'legs', muscleGroups: ['Calves'] },
  { id: 'lunges', name: 'Lunges', category: 'legs', muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'] },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'legs', muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'] },

  // Core
  { id: 'plank', name: 'Plank', category: 'core', muscleGroups: ['Core', 'Shoulders'] },
  { id: 'crunches', name: 'Crunches', category: 'core', muscleGroups: ['Abs'] },
  { id: 'russian-twists', name: 'Russian Twists', category: 'core', muscleGroups: ['Obliques', 'Abs'] },
  { id: 'mountain-climbers', name: 'Mountain Climbers', category: 'core', muscleGroups: ['Core', 'Shoulders', 'Legs'] },
  { id: 'bicycle-crunches', name: 'Bicycle Crunches', category: 'core', muscleGroups: ['Abs', 'Obliques'] },
  { id: 'leg-raises', name: 'Leg Raises', category: 'core', muscleGroups: ['Lower Abs', 'Hip Flexors'] },

  // Cardio
  { id: 'treadmill-running', name: 'Treadmill Running', category: 'cardio', muscleGroups: ['Cardiovascular', 'Legs'] },
  { id: 'elliptical', name: 'Elliptical', category: 'cardio', muscleGroups: ['Cardiovascular', 'Full Body'] },
  { id: 'stationary-bike', name: 'Stationary Bike', category: 'cardio', muscleGroups: ['Cardiovascular', 'Legs'] },
  { id: 'rowing-machine', name: 'Rowing Machine', category: 'cardio', muscleGroups: ['Cardiovascular', 'Back', 'Legs'] },
  { id: 'burpees', name: 'Burpees', category: 'cardio', muscleGroups: ['Full Body', 'Cardiovascular'] },
  { id: 'jump-rope', name: 'Jump Rope', category: 'cardio', muscleGroups: ['Cardiovascular', 'Calves', 'Coordination'] }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    logger.info('🌱 Starting database seeding...');
    
    await client.query('BEGIN');

    // Clear existing exercises
    await client.query('DELETE FROM exercises');
    logger.info('✅ Cleared existing exercises');

    // Insert exercises
    for (const exercise of exerciseDatabase) {
      await client.query(
        'INSERT INTO exercises (id, name, category, muscle_groups) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
        [exercise.id, exercise.name, exercise.category, exercise.muscleGroups]
      );
    }

    await client.query('COMMIT');
    logger.info(`✅ Seeded ${exerciseDatabase.length} exercises`);
    logger.info('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch((error) => {
    logger.error('Seeding failed:', error);
    process.exit(1);
  });
}

export default seedDatabase;