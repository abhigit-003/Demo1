import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { loginRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', register);
// Apply rate limiter to login route to prevent brute-force attacks
router.post('/login', loginRateLimiter, login);
router.get('/me', authenticate, getMe);

export default router;
