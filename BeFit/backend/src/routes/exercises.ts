import express from 'express';
import pool from '../database/connection.js';

const router = express.Router();

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT id, name, category, muscle_groups FROM exercises';
    let params: any[] = [];
    
    if (category && category !== 'all') {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY name';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get exercise categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM exercises ORDER BY category'
    );
    
    const categories = result.rows.map(row => row.category);
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;