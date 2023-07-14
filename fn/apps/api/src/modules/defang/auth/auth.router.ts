import express, { Router } from 'express';
import { getDefangToken } from './auth.service';

export const authRouter: Router = express.Router();

authRouter.get('/token', getDefangToken);