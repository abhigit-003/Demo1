import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, providerProfile } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Sanitize role to prevent privilege escalation (never allow 'admin' via public API)
    const safeRole = role === 'provider' ? 'provider' : 'user';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: safeRole,
      providerProfile: safeRole === 'provider' ? providerProfile : null
    });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('[SECURITY] JWT_SECRET not set in environment. Check .env file.');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
    );

    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('[SECURITY] JWT_SECRET not set in environment. Check .env file.');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
    );

    // Audit log: flag successful developer logins
    if (user.role === 'developer') {
      console.info(`[AUTH AUDIT ✅] Developer login: ${user.email} at ${new Date().toISOString()}`);
    }

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
