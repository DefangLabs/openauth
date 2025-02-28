import { Hono } from "hono/tiny"
import { clientsRouter } from "./clients/router"
import { issuerRouter } from "./issuer/router"
import { userinfoRouter } from "./userinfo/route"
import "./analytics/analytics"
import { Context } from "hono"

const rootRouter = new Hono();

rootRouter.route('/clients', clientsRouter);
rootRouter.route('/userinfo', userinfoRouter);

const health = (c: Context) => {
  // Eventually should check if properly connected to DynamoDB etc.
  return c.json({ ok: true })
}
rootRouter.get('/', health);
rootRouter.get('/health', health);

rootRouter.get('/info', (c: Context) => {
  return health(c);
});

// TODO: Add route to issue a fake test token
// rootRouter.get('/testing/token', (c: Context) => {
// });

rootRouter.get('/.well-known/jwks', async (c: Context) => {
  // this is a bit stupid, but works for now

  const url = new URL(c.req.url);
  url.host = c.req.header('x-forwarded-host') ?? url.host;
  url.protocol = c.req.header('x-forwarded-proto') ?? url.protocol;
  url.port = c.req.header('x-forwarded-port') ?? url.port;
  url.pathname = '/.well-known/jwks.json';

  const response = await fetch(url.toString());
  const json = await response.json();

  return c.json(json as any);
});

// Mount OpenAuth routes last
rootRouter.route('/', issuerRouter);

export default rootRouter;