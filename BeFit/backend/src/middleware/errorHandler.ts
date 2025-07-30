import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Default error
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error'
  };

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      statusCode: 401,
      message: 'Invalid token'
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      statusCode: 401,
      message: 'Token expired'
    };
  }

  // PostgreSQL errors
  if (err.code === '23505') { // Unique violation
    error = {
      statusCode: 400,
      message: 'Resource already exists'
    };
  }

  if (err.code === '23503') { // Foreign key violation
    error = {
      statusCode: 400,
      message: 'Referenced resource does not exist'
    };
  }

  if (err.code === '23502') { // Not null violation
    error = {
      statusCode: 400,
      message: 'Required field is missing'
    };
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error = {
      statusCode: 400,
      message: 'Validation failed'
    };
  }

  // Send error response
  res.status(error.statusCode).json({
    error: error.message,
    timestamp: new Date().toISOString(),
    path: req.url,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err 
    })
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};