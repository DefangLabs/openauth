# Deleting Tenants

This document describes how tenant deletion works in the portal and
what external systems need to be updated when a tenant is removed.

## Flow

1. A user issues a request to delete a tenant via the UI.
2. The row is deleted from Postgres which triggers the `tenantDeleted`
   event in Hasura.
3. Hasura forwards the event to the API service where the new
   `tenantDeleted` handler runs.
4. The handler cancels any active Stripe subscriptions for the tenant
   and removes the Stripe customer record.

Cleaning up billing information asynchronously keeps the database
delete fast while ensuring no subscriptions or customer records are left
behind.

## Account Deletion

When a user deletes their account the API checks for any tenants they
still own. If tenants remain the portal warns that all owned tenants
will be removed. If the user confirms we automatically delete each
tenant by calling the flow above. This keeps the experience simple while
ensuring no orphaned tenants remain.
