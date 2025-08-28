/**
 * Routes related to user operations. Currently exposes a single route
 * to delete the authenticated user.
 */
import { Hono } from 'hono';
import { deleteUser } from './users.service';

export const userRouter = new Hono();

userRouter.delete('/', deleteUser);
