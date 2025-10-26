import { Router } from 'express';
import { productController } from '../controllers/productController';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/delete/:id', productController.deleteProduct);
export default router;