import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url'; 

import { router as authRoutes } from './routes/userRoutes.js';
import { homeRouter as homeRoutes } from './routes/homeRouter.js';
import { verifyToken } from './middleware/protect.js';
import { router as destinationRouter } from './routes/destinationRouter.js';
import buddyRouter from './routes/buddyRouter.js';
import { staticRoutes } from './routes/staticRoutes.js';
import { contactRouter } from './routes/contactRouter.js';
import { supportRouter } from './routes/supportRouter.js';
import tripRouter from './routes/tripRouter.js';
import { router as dashboardRouter } from './routes/dashboard.js';

dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static assets
app.use('/css', express.static('./views/css'));
app.use('/js', express.static('./views/js'));
app.use('/assets', express.static('./views/assets'));
app.use('/Utils', express.static(path.join(__dirname, 'Utils'))); // Serve Utils folder
app.use('/images', express.static(path.join(__dirname, 'views/images'))); // Serve images folder

// Routes
app.use('/auth', authRoutes);
app.use('/', verifyToken, homeRoutes);
app.use('/', verifyToken, destinationRouter);
app.use('/find-buddy', verifyToken, buddyRouter);
app.use('/', verifyToken, staticRoutes);
app.use('/', verifyToken, contactRouter);
app.use('/contact', verifyToken, contactRouter);
app.use('/', verifyToken, supportRouter);
app.use('/', verifyToken, dashboardRouter);
app.use('/trip/join', verifyToken, tripRouter);

// Auth Pages
app.get('/login', (req, res) => {
  res.render('pages/Login');
});

app.get('/email-verification', (req, res) => {
  res.render('pages/Email');
});

app.get('/signup', (req, res) => {
  res.render('pages/Signup');
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