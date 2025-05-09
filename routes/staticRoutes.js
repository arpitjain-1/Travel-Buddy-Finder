// routes/staticRoutes.js or routes/mainRoutes.js
import express from 'express';
const router = express.Router();

// Controller if using one
router.get('/about-us', (req, res) => {
  res.render('pages/about-us', { title: 'About Us' });
});

export { router as staticRoutes };