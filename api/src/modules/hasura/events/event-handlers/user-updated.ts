import { Context } from "hono";
import { HasuraEvent } from "../../../../lib/hasura/hasura-event-schema";
import { upsertStripeCustomer } from "../../../../lib/stripe/upsert-stripe-customer";

export async function userUpdated(event: HasuraEvent, c: Context) {
    const userId = event.event.data.new.id;
    const newData = event.event.data.new;
    const oldData = event.event.data.old;
    const emailChanged = newData.email !== oldData.email && !!newData.email;

    if (!userId) {
        throw new Error('User id not found');
    }


    if (emailChanged) {
        await upsertStripeCustomer(userId, {
            email: newData.email,
        });
    } 
}