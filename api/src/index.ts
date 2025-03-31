import { accountRouter } from './modules/accounts/accounts.router';
import { hasuraRouter } from './modules/hasura/hasura.router';
import { stripeRouter } from './modules/stripe/stripe.router';

import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text("I'm alive, thank you very much."));

app.route('/accounts', accountRouter);
app.route('/stripe', stripeRouter);
app.route('/hasura', hasuraRouter);

export default app
