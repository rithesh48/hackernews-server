import { Router } from 'express';
import { getComments, addComment, deleteComment } from '../controllers/commentController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/on/:postId', verifyToken, getComments); // Get all comments on a post (reverse chronological)
router.post('/on/:postId', verifyToken, addComment); // Add a comment to a post
router.delete('/:commentId', verifyToken, deleteComment); // Delete a comment (only if it belongs to the user)

export default router;
// Add the missing export for deleteComment
export { getComments, addComment, deleteComment };
