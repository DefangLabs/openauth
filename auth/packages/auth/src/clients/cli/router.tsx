import { createClient } from "@openauthjs/openauth/client";
import { Hono } from "hono";
import { render } from 'hono/jsx/dom';
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { getComputedOrigin } from "../../lib/get-computed-origin";
import { SuccessPage } from "./components/success-page";

export const cliRouter = new Hono();

cliRouter.get('/start', async c => {
    const authServer = getComputedOrigin(c);

    const port = c.req.query('defang-cli-port');

    if (!port) {
        return c.json({ error: 'port not found' }, 400)
    }

    setCookie(c, 'defang-cli-port', port, {
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
    })

    const client = createClient({
        clientID: 'defang-cli',
        issuer: authServer,
    })

    const { url } = await client.authorize(
        `${authServer}/clients/cli/success`,
        'token',
    );

    return c.redirect(url);
});



cliRouter.get('/success', async c => {
    const port = getCookie(c, 'defang-cli-port');

    if (!port) {
        return c.json({ error: 'port not found' }, 400)
    }

    deleteCookie(c, 'defang-cli-port');

    return c.html(<SuccessPage port={port} />);
});

cliRouter.get('/test', async c => {
    return c.html(<SuccessPage port={'8000'} />);
});