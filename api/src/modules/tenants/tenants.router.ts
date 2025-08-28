import { Hono } from 'hono';
import { initiateDeletion } from './tenants.service';

export const tenantsRouter = new Hono();

tenantsRouter.delete('/:id', initiateDeletion);
