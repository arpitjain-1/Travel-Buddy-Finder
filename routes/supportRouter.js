import express from 'express';
import { showSupportPage } from '../controllers/supportController.js';

const router = express.Router();

router.get('/support', showSupportPage);

export { router as supportRouter };
