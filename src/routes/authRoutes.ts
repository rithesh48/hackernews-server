import express from 'express';
import { signUp, logIn } from '../controllers/authenticationcontoller';

const router = express.Router();

router.post('/sign-in', signUp);  // User registration
router.post('/log-in', logIn);    // User login

export default router;
