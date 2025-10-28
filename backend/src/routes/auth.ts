import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../utils/middleware/auth';

const router = Router();

// Auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.getCurrentUser); // Token kontrolü ile

export default router;