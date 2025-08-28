# Initiate Tenant Deletion Action

This document outlines the recommended steps for moving tenant deletion to a dedicated Hasura action.

## Overview

Currently tenants can be deleted directly from the frontend using the built in mutation `deleteTenantsByPk`. This bypasses the Fabric API and does not confirm that the authenticated user actually owns the tenant. The `deleteUser` action also incorrectly calls Fabric with only the user token which is no longer sufficient because a single user may own many tenants.

The goal is to introduce a new `initiateTenantDeletion` action backed by an API endpoint. The action will validate ownership, delete the tenant from Fabric, and finally remove the row from Postgres using the Hasura SDK. Client side code should call this action instead of the mutation and the mutation should be removed from user level permissions.

## Proposed Implementation Steps

1. **Create Tenant API Module**
   - Add a `tenants` folder under `api/src/modules` with `tenants.router.ts` and `tenants.service.ts`.
   - Expose a `DELETE /tenants/:id` route on the router. Mount the router under `/tenants` in `api/src/index.ts`.
   - In `tenants.service.ts` implement an `initiateDeletion` handler:
     - Read the bearer token from the request and validate it using `validateJwt`.
    - Query Hasura for the tenant using both the `tenantId` and `ownerId` in the filter. If the count is zero the user does not own the tenant and we return `403`.
    - Call the Fabric client directly with the JWT via `defangClient.deleteMe({})` and set the tenant id in the `X-Defang-Tenant-Id` header. No token exchange is required.
    - Use the Hasura client with the user token to delete the tenant row using a mutation that checks both `id` and `ownerId` to avoid race conditions:

      ```graphql
      mutation DeleteTenant($tenantId: uuid!, $ownerId: uuid!) {
        deleteTenants(
          where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }
        ) {
          affectedRows
        }
      }
      ```

2. **Add Hasura Action**
   - Update `hasura/metadata/actions.graphql` and `actions.yaml` to define `initiateTenantDeletion`.
   - Configure the action to forward client headers and call the new API route with `method: DELETE`.
   - Add the output type `InitiateTenantDeletionOutput` with a simple `message: String!` field.

3. **Remove Direct Delete Permission**
   - Modify `hasura/metadata/databases/Primary/tables/public_tenants.yaml` to remove the `delete_permissions` entry for role `user`.
   - This ensures tenants cannot be deleted directly with a GraphQL mutation and must use the new action.

4. **Update Frontend**
   - Replace usage of the `deleteTenantsByPk` mutation with an Apollo mutation that calls `initiateTenantDeletion`.
   - Ensure the returned message is surfaced to the user and that tenant lists refresh after successful deletion.

5. **Clean Up `deleteUser`**
   - In `users.service.ts` remove the call to `deleteFabric({ token })`.
   - Keep the existing guard that prevents deleting a user account while they still own tenants.

6. **Edge Cases and Additional Considerations**
   - **Ownership race conditions**: fetch the tenant and owner in a single mutation to avoid the record changing between checks. For example:

     ```graphql
     mutation DeleteTenant($tenantId: uuid!, $ownerId: uuid!) {
       deleteTenants(
         where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }
       ) {
         affectedRows
       }
     }
     ```

   - **External tenants**: owners should still be able to remove tenants from external providers. The deletion trigger handles any subscription cleanup automatically.
   - **Billing cleanup failures**: if Fabric deletion fails return a 500 so the client can retry. Hasura deletion should not occur until Fabric confirms the tenant is removed.
   - **Testing**: once the flow is implemented we should add unit tests for the ownership check and an integration test to verify the action end-to-end.

## Conclusion

By funnelling tenant deletion through a single API backed action we can ensure proper authorization and consistent cleanup of external resources. Removing direct delete permissions guards against accidental data loss and keeps the logic centralized alongside existing user deletion flows. This approach also lets us pass the user's JWT to Fabric so the service can act on their behalf, something the database trigger cannot do.
