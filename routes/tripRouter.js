import express from 'express';
import { joinTrip } from '../controllers/tripController.js';

const router = express.Router();

// Route to join a trip
router.post('/:tripId', joinTrip);

export default router;
