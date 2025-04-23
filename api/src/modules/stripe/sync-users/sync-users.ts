import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { defangApiSecret } from "../../../constants";
import { graphql } from "../../../graphql";
import { getHasuraClient } from "../../../lib/hasura/client";
import { upsertStripeCustomer } from "../../../lib/stripe/upsert-stripe-customer";
import { getStripeClient } from "../../../lib/stripe/get-stripe-client";
import * as v from "valibot"


const fetchHasuraUsers = graphql(`
  query fetchHasuraUsers(
    $ids: [uuid!]
  ) {
    users(
      limit: 10000,
      where:  {
         id: {
          _nin: $ids
         }
      }
    ) {
      id
      email
    }
  }
`);


/**
 * Fetch stripe customers that have a defang ID
 * 
 * Considered using the Stripe API's search endpoint but it's got much lower
 * rate limits than the list endpoint. Figured this might be more efficient
 * and it shouldn't matter much given the small number of customers at the moment.
 */
async function getStripeCustomers() {
  const stripe = getStripeClient();
  const stripeCustomers: { customerId: string; email: string; defangUserId: string }[] = [];

  const batchSize = 100;
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    try {
      const customerBatch = await stripe.customers.list({
        limit: batchSize,
        starting_after: startingAfter,
        expand: ['data.metadata'],
      });

      hasMore = customerBatch.has_more;

      if (hasMore && customerBatch.data.length > 0) {
        startingAfter = customerBatch.data[customerBatch.data.length - 1].id;
      }

      const validCustomers = customerBatch.data
        .filter(customer => customer.metadata?.defangUserId)
        .map(customer => ({
          customerId: customer.id,
          email: customer.email || '',
          defangUserId: customer.metadata.defangUserId as string
        }));

      stripeCustomers.push(...validCustomers);
    } catch (error) {
      console.error('Error fetching stripe customers:', error);
      hasMore = false;
    }
  }

  return stripeCustomers;
}


async function getHasuraUsers(ignoreIds: string[]) {
  const hasura = getHasuraClient();
  const hasuraUsersRequest = await hasura.fetch(fetchHasuraUsers, {
    ids: ignoreIds,
  });

  if (hasuraUsersRequest.errors.length > 0) {
    throw new HTTPException(500, {
      message: 'Failed to fetch Hasura users',
    });
  }

  return hasuraUsersRequest.data.users;
}


const postUserSchema = v.object({
  id: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.minLength(1)),
  tenant: v.pipe(v.string(), v.minLength(1)),
});

type PostUser = v.InferOutput<typeof postUserSchema>;


/**
 * First fetch all Stripe user IDs.
 * 
 * Then get all users in Hasura that don't exist in Stripe.

 */
export async function syncStripeUsers(c: Context) {
  const authHeader = c.req.header('authorization');
  if (!authHeader || authHeader !== defangApiSecret) {
    throw new HTTPException(401, {
      message: 'Unauthorized',
    });
  }

  // check if we have a post body at all
  const body = await c.req.text();
  if (!body) {
    return c.json({ message: 'No request body' }, 400);
  }

  const postBody = JSON.parse(body);
  if (typeof postBody !== 'object' || !Array.isArray(postBody)) {
    return c.json({ message: 'Invalid request' }, 400);
  }

  const stripeCustomers = await getStripeCustomers();
  const usersInStripe = stripeCustomers.map(user => user.defangUserId);
  const hasuraUsers = (await getHasuraUsers(usersInStripe));

  const customersToCreate = hasuraUsers.map(user => ({
    defangUserId: user.id,
    email: user.email,
  }));

  for (const user of customersToCreate) {
    if (!user.email || !user.defangUserId) {
      continue;
    }
    await upsertStripeCustomer(user.defangUserId, { email: user.email });
    // try to avoid stripe rate limit
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  return c.json({
    message: 'Users synced successfully',
  });
}