const express = require('express');
const { getComments, addComment, deleteComment } = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/on/:postId', verifyToken, getComments); // Get all comments on a post (reverse chronological)
router.post('/on/:postId', verifyToken, addComment); // Add a comment to a post
router.delete('/:commentId', verifyToken, deleteComment); // Delete a comment (only if it belongs to the user)

module.exports = router;
