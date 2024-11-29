import express, { Router } from 'express';
import { createStripeClientSecret, createStripePortalSession } from './stripe.service';

export const stripeRouter: Router = express.Router();

stripeRouter.post('/secret', createStripeClientSecret);
stripeRouter.post('/portal', createStripePortalSession);
