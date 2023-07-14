import express, { Router } from 'express';
import { servicesRouter } from './services/services.router';
import { authRouter } from './auth/auth.router';

export const defangRouter: Router = express.Router();

defangRouter.use('/services', servicesRouter);
defangRouter.use('/auth', authRouter);