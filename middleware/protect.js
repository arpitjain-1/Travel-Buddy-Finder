// middleware/protect.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const publicPaths = ['/login', '/signup', '/email-verification'];

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  // Allow public routes
  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
