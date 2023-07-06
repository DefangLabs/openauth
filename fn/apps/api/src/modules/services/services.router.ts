import express, { Router } from 'express';
import { getServices, getService } from './services.service';

export const servicesRouter: Router = express.Router();

servicesRouter.get('/services', getServices);
servicesRouter.get('/services/:serviceId', getService);