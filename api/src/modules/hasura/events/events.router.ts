import { Hono } from 'hono';
import { handleEvent } from './events.service';

export const eventsRouter = new Hono();

eventsRouter.post('/', handleEvent);
