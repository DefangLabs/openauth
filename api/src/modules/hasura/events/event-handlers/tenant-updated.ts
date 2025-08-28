import { Context } from "hono";
import { HasuraEvent } from "../../../../lib/hasura/hasura-event-schema";
import { getStripeCustomer } from "../../../../lib/stripe/get-stripe-customer";
import { upsertStripeCustomer } from "../../../../lib/stripe/upsert-stripe-customer";
import { graphql } from "../../../../graphql";
import { getHasuraClient } from "../../../../lib/hasura/client";


const tenantOwnerEmailQuery = graphql(`
  query TenantOwnerEmail($tenantId: uuid!) {
    tenants(where: { id: { _eq: $tenantId } }) {
      id
      owner {
        email
      }
    }
  }
`);

/**
 * Handles the `tenantInserted` Hasura event.
 *
 * When a tenant is updated, if the ownerId changes, we update the Stripe customer
 * metadata to reflect the new owner's email. This ensures that the Stripe
 * customer is always associated with the correct tenant owner.
 */
export async function tenantUpdated(event: HasuraEvent, _c: Context) {
  const tenantId = event.event.data.new.id;

  if (!tenantId) {
    throw new Error('Tenant id not found');
  }

  const client = getHasuraClient();
  const response = await client.fetch(tenantOwnerEmailQuery, { tenantId });
  const owner = response.data?.tenants[0]?.owner;
  const email = owner?.email;
  if (!email) {
    throw new Error(`Tenant owner email not found for tenant ${tenantId}`);
  }

  // Reuse the upsert helper so logic stays in one place. We pass the existing
  // email to satisfy creation/update requirements even though a record should
  // already exist.
  await upsertStripeCustomer(tenantId, { email });
}
