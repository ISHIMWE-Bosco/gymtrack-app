import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  });
};

// Export the interface for use in other files
export type { AuthenticatedRequest };