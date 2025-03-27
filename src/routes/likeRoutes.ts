import { Router } from 'express';
import { getLikes, addLike, removeLike } from '../controllers/likeController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/on/:postId', verifyToken, getLikes); // Get all likes on a post (reverse chronological)
router.post('/on/:postId', verifyToken, addLike); // Like a post (1 like per user per post)
router.delete('/on/:postId', verifyToken, removeLike); // Remove like from a post

export default router;
