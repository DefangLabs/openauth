# Stripe Customer Tenant Migration

This document describes the transition from storing `defangUserId` in Stripe
customer metadata to using `defangTenantId`.

## Background

Historically a customer record in Stripe was created when a user signed up. The
`defangUserId` was stored in the customer's metadata and all billing logic used
that field. With the introduction of tenants we want billing to be tracked per
tenant instead of per user.

## Migration Flow

1. When each tenant row is inserted Hasura triggers the new `tenantInserted`
   event.
2. The `tenantInserted` handler calls the `upsertStripeCustomer`
   function with the tenant ID. That function fetches the customer from
   Stripe using the `defangTenantId` metadata field or the `defangUserId`
   field if the tenant does not have a customer yet. Then it either updates
   the existing customer, swapping the `defangUserId` for `defangTenantId`,
   or creates a new customer if none exists.

## Gaps

- Deleting tenants does not currently clean up Stripe customers. Existing user
  deletion logic should be revisited if tenant deletion becomes common.
