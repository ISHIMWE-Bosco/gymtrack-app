import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}


export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email?: string;
    };

    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
