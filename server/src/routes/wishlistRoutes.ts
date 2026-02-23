import { Router } from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:itemId', removeFromWishlist);

export default router;
