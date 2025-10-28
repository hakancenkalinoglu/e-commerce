import { Router } from 'express';
import { productController } from '../controllers/productController';
import { authMiddleware } from '../utils/middleware/auth';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;