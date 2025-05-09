import express from 'express';
const router = express.Router();
import { showDashboard } from '../controllers/dashboardController.js';
router.get('/dashboard', showDashboard);

export { router};
