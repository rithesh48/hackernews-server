import { Router } from 'express';
import { getUserDetails, getAllUsers } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', verifyToken, getUserDetails); // Get current user's details
router.get('/', verifyToken, getAllUsers); // Get all users (sorted alphabetically)

export default router;
