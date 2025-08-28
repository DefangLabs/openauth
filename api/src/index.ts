import { awsMarketplaceRouter } from './modules/aws-marketplace/aws-marketplace.router';
import { hasuraRouter } from './modules/hasura/hasura.router';
import { stripeRouter } from './modules/stripe/stripe.router';
import { tenantsRouter } from './modules/tenants/tenants.router';
import { userRouter } from './modules/users/users.router';

import { Hono } from 'hono';

const app = new Hono()

app.get('/', (c) => c.text("I'm alive, thank you very much."));

app.route('/users', userRouter);
app.route('/stripe', stripeRouter);
app.route('/hasura', hasuraRouter);
app.route('/tenants', tenantsRouter);
app.route('/aws-marketplace', awsMarketplaceRouter);

export default app
