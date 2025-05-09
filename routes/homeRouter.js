import express from 'express';
import { getHomePage } from '../controllers/homeController.js';

const homeRouter = express.Router();

homeRouter.get('/', getHomePage);

export { homeRouter };