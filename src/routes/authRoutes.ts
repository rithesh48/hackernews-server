const express = require('express');
const { signUp, logIn } = require('../controllers/authController');

const router = express.Router();

router.post('/sign-in', signUp);  // User registration
router.post('/log-in', logIn);    // User login

module.exports = router;
