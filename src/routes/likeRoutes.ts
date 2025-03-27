const express = require('express');
const { getLikes, addLike, removeLike } = require('../controllers/likeController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/on/:postId', verifyToken, getLikes); // Get all likes on a post (reverse chronological)
router.post('/on/:postId', verifyToken, addLike); // Like a post (1 like per user per post)
router.delete('/on/:postId', verifyToken, removeLike); // Remove like from a post

module.exports = router;
