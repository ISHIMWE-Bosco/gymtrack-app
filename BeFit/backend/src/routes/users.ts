import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../database/connection.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      joinedDate: user.created_at
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', [
  authenticateToken,
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail()
], async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const authReq = req as AuthenticatedRequest;
    const { name, email } = req.body;
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (name) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }

    if (email) {
      updates.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }

    values.push(authReq.user!.userId);

    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, email, name, created_at`,
      values
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        joinedDate: user.created_at
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;