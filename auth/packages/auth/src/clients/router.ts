import { Hono } from "hono/tiny";
import { cliRouter } from "./cli/router";

export const clientsRouter = new Hono();

clientsRouter.route('/cli', cliRouter);

