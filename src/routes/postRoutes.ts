import { Router } from 'express';
import { getAllPosts, getUserPosts, createPost, deletePost } from '../controllers/postController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, getAllPosts); // Get all posts (reverse chronological)
router.get('/me', verifyToken, getUserPosts); // Get current user's posts (reverse chronological)
router.post('/', verifyToken, createPost); // Create a new post
router.delete('/:postId', verifyToken, deletePost); // Delete a post (only if it belongs to the user)

export default router;
