import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('[SECURITY] JWT_SECRET is not set. Check your .env file.');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeProvider = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'provider' && req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Access denied: Providers only' });
    return;
  }
  next();
};

export const authorizeDeveloper = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'developer') {
    res.status(403).json({ message: 'Access denied: Developers only' });
    return;
  }
  next();
};
