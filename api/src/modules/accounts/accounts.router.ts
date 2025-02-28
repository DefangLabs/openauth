import { Hono } from 'hono';
import { deleteAccount } from './accounts.service';

export const accountRouter = new Hono();

accountRouter.delete('/', deleteAccount);
