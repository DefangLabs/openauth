import { Context } from "hono";
import { HasuraEvent } from "../../../../lib/hasura/hasura-event-schema";
import { createStripeCustomer } from "../../../../lib/stripe/create-stripe-customer";
import { env } from "hono/adapter";
import { getStripeClient } from "../../../../lib/stripe/get-stripe-client";

export async function userInserted(event: HasuraEvent, c: Context){
    const userId = event.event.data.new.id;
    console.log(`@@ User inserted with id: ${userId}`);

    if (!userId) {
        throw new Error('User id not found');
    }

    const customer = await createStripeCustomer(userId, {
        email: event.event.data.new.email,
    });

    /**
     * Leaving this here for now, but we will not be creating a subscription for now.
     * Keeping it in case we want to do it in the future.
     */

    // // subscribe to the default plan
    // const stripeDefaultPriceId = env<{
    //     STRIPE_DEFAULT_PRICE_ID: string | undefined;
    // }>(c).STRIPE_DEFAULT_PRICE_ID;

    // if (!stripeDefaultPriceId) {
    //     throw new Error('Stripe default price id not found');
    // }

    // // create a subscription
    // const stripe = getStripeClient();
    // await stripe.subscriptions.create({
    //     customer: customer.id,
    //     items: [
    //         {
    //             price: stripeDefaultPriceId,
    //         },
    //     ],
    // }, {
    //     // default sub idempotency key
    //     idempotencyKey: `idem_dsub_${userId}`,
    // });

    console.log(`@@ Created stripe customer: ${customer.id}`);
}