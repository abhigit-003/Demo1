import { Router } from 'express';
import { getBookings, createBooking, getProviderBookings } from '../controllers/userController';
import { authenticate, authorizeProvider } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', getBookings);
router.get('/provider', authorizeProvider, getProviderBookings);
router.post('/', createBooking);

export default router;
