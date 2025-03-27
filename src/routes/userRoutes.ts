const express = require('express');
const { getUserDetails, getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', verifyToken, getUserDetails); // Get current user's details
router.get('/', verifyToken, getAllUsers); // Get all users (sorted alphabetically)

module.exports = router;
