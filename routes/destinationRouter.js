import express from 'express';
const router = express.Router();
import {getDestinationsPage} from '../controllers/destinationController.js';

router.get('/destinations', getDestinationsPage);

export { router };