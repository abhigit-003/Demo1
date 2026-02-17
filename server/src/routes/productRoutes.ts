import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authenticate, authorizeProvider } from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorizeProvider, createProduct);
router.put('/:id', authenticate, authorizeProvider, updateProduct);
router.delete('/:id', authenticate, authorizeProvider, deleteProduct);

export default router;
