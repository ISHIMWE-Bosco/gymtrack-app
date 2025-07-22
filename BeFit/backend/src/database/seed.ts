import pool from './connection.js';
import { exerciseDatabase } from './exercises.js';

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seeding...');

    await client.query('BEGIN');

    // Clear existing exercises
    await client.query('DELETE FROM exercises');
    console.log('✅ Cleared existing exercises');

    // Insert exercises
    for (const exercise of exerciseDatabase) {
      await client.query(
        'INSERT INTO exercises (id, name, category, muscle_groups) VALUES ($1, $2, $3, $4)',
        [exercise.id, exercise.name, exercise.category, exercise.muscleGroups]
      );
    }

    await client.query('COMMIT');
    console.log(`✅ Seeded ${exerciseDatabase.length} exercises`);
    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

export default seedDatabase;