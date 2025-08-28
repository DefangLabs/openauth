import { Context } from "hono";
import { HasuraEvent } from "../../../../lib/hasura/hasura-event-schema";
import { upsertStripeCustomer } from "../../../../lib/stripe/upsert-stripe-customer";

export async function userInserted(event: HasuraEvent, c: Context){
    const userId = event.event.data.new.id;

    if (!userId) {
        throw new Error('User id not found');
    }

    /**
     * Recently updated to take care of adding the default plan
     * reason being that wherever we create a customer, we need to 
     * add the default plan it's unlikely but possible that we 
     * need to create the customer elsewhere.
     * 
     * Edit: we've decided to remove the default plan logic. 
     * I'm leaving things this way though, in case there are other
     * events that require use to create a Stripe customer and
     * if we need to add logic to that process.
     */
    await upsertStripeCustomer(userId, {
        email: event.event.data.new.email,
    });

}
