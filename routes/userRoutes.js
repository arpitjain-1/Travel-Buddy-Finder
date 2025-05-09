// userRoutes.js
import express from 'express';
import { requestOTP, handleUserSignup, handleUserLogin, handleUserAccountData, handleLogout  } from '../controllers/userController.js';
import { verifyToken } from '../middleware/protect.js';

const router = express.Router();

// Route to request OTP
router.post('/request-otp', requestOTP);

// Route to handle user signup
router.post('/signup', handleUserSignup);

// User login route
router.post('/login', handleUserLogin);

// Protected route to get user data
router.get('/me', verifyToken, handleUserAccountData);

router.post('/logout', handleLogout);

export { router };
