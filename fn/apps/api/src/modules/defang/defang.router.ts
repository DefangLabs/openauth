import express, { Router } from 'express';
import { authRouter } from './auth/auth.router';

export const defangRouter: Router = express.Router();

defangRouter.use('/auth', authRouter);