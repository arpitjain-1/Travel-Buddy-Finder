import express from 'express';
import { showContactPage, handleContactForm } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', showContactPage);
router.post('/', handleContactForm);

export { router as contactRouter };