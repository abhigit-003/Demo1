import { Router } from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController';
import { authenticate, authorizeProvider } from '../middleware/auth';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', authenticate, authorizeProvider, createService);
router.put('/:id', authenticate, authorizeProvider, updateService);
router.delete('/:id', authenticate, authorizeProvider, deleteService);

export default router;
