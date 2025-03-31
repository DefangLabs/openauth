import { Hono } from 'hono';
import { eventsRouter } from './events/events.router';

export const hasuraRouter = new Hono();

hasuraRouter.route('/events', eventsRouter);