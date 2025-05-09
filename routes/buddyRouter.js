import express from 'express';
import { showFindBuddyPage, createBuddySearch, createTrip } from '../controllers/buddyController.js';

const router = express.Router();

// Route for showing the Find Buddy page with searches and trips
router.get('/', showFindBuddyPage);

// Route for creating a buddy search
router.post('/create-buddy-search', createBuddySearch);

// Route for creating a new trip
router.post('/create-trip', createTrip);

export default router;
