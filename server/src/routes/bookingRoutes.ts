import { Router } from 'express';
import { getBookings, createBooking } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', getBookings);
router.post('/', createBooking);

export default router;
