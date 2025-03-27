const express = require('express');
const { getAllPosts, getUserPosts, createPost, deletePost } = require('../controllers/postController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getAllPosts); // Get all posts (reverse chronological)
router.get('/me', verifyToken, getUserPosts); // Get current user's posts (reverse chronological)
router.post('/', verifyToken, createPost); // Create a new post
router.delete('/:postId', verifyToken, deletePost); // Delete a post (only if it belongs to the user)

module.exports = router;
