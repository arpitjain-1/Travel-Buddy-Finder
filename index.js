import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/userRoutes.js';
import { verifyToken } from './middleware/protect.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser()); // Add this before any routes that require cookie access

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static assets (CSS, JS, images)
app.use('/css', express.static('./views/css'));
app.use('/js', express.static('./views/js'));
app.use('/assets', express.static('./views/assets'));

// Authentication routes
app.use('/auth', router);

// Render Login page
app.get('/login', (req, res) => {
  res.render('pages/Login');
});

// Render Email entry page
app.get('/email-verification', (req, res) => {
  res.render('pages/Email');
});

// Render Signup page
app.get('/signup', (req, res) => {
  res.render('pages/Signup');
});

// Render Home page (protected)
app.get('/', verifyToken,(req, res) => {
  res.render('pages/Home', { user: req.user });
});

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
