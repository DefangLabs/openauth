import { Hono } from 'hono';
import { createStripeClientSecret, createStripePortalSession, webhookHandler } from './stripe.service';

export const stripeRouter = new Hono();

stripeRouter.post('/secret', createStripeClientSecret);
stripeRouter.post('/portal', createStripePortalSession);
stripeRouter.post('/webhook', webhookHandler);