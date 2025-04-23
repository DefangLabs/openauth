import { Context } from "hono";
import { userInserted } from "./event-handlers/user-inserted";
import { defangApiSecret } from "../../../constants";
import * as v from "valibot";
import { HasuraEvent, hasuraEventSchema } from "../../../lib/hasura/hasura-event-schema";
import { userUpdated } from "./event-handlers/user-updated";

const eventHandlers: {
    [key: string]: (e: HasuraEvent, c: Context) => Promise<any>
} = {
    userInserted,
    userUpdated,
}

export async function handleEvent(c: Context) {
    const rawBody = await c.req.json();

    const validationResult = v.safeParse(hasuraEventSchema, rawBody);

    if (!validationResult.success) {
        return c.json({ message: 'Invalid request' }, 400);
    }

    const authHeader = c.req.header('authorization');
    if (!authHeader || authHeader !== defangApiSecret) {
        return c.json({ message: 'Unauthorized' }, 401);
    }

    const body = validationResult.output;

    const trigger = body.trigger.name;

    if (!eventHandlers[trigger]) {
        return c.json({ message: 'Trigger not found' }, 404);
    }

    try {
        await eventHandlers[trigger](body, c);
    } catch (error) {
        console.error('@@ error', error);
        return c.json({ message: 'Internal server error' }, 500);
    }


    return c.json({ message: 'Success' });
}