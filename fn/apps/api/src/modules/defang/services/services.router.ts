import express from 'express';
import { getService, getServiceLogs, getServices } from './services.service';

export const servicesRouter = express.Router();

servicesRouter.get('/', getServices);
servicesRouter.get('/:serviceName', getService);
servicesRouter.ws('/:serviceName/logs', getServiceLogs);