import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    logger.info('🔄 Starting database migrations...');
    
    // Read and execute the migration file
    const migrationPath = join(__dirname, '../../supabase/migrations/20250721193239_quiet_resonance.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    await client.query('BEGIN');
    
    // Split by semicolon and execute each statement
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        await client.query(statement);
      }
    }
    
    await client.query('COMMIT');
    logger.info('✅ Database migrations completed successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('❌ Database migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migrations if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations().catch((error) => {
    logger.error('Migration failed:', error);
    process.exit(1);
  });
}

export default runMigrations;