import express, { Router } from 'express';
import { getJwt } from './jwt.service';

export const jwtRouter: Router = express.Router();

jwtRouter.get('/jwt', getJwt);
