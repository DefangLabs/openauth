import express, { Router } from 'express';
import { deleteAccount } from './accounts.service';

export const accountRouter: Router = express.Router();

accountRouter.delete('/', deleteAccount);
