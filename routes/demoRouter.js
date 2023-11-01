import express from 'express';
import { demoHandler } from '../controllers/demoController.js';

const demoRouter = express.Router();

demoRouter.get('/', demoHandler);

export { demoRouter };