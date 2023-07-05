import express, { Router } from 'express';
import { getServices } from './services.service';

export const servicesRouter: Router = express.Router();

servicesRouter.get('/services', getServices);