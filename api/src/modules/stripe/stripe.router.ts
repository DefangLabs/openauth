import { Hono } from 'hono';
import { createStripeClientSecret, createStripePortalSession } from './stripe.service';

export const stripeRouter = new Hono();

stripeRouter.post('/secret', createStripeClientSecret);
stripeRouter.post('/portal', createStripePortalSession);
