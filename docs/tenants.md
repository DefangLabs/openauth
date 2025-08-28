# Tenants Overview

This document will summarize how tenant management works in the portal. 

## Auth Service

- When a user first authenticates the auth service calls `upsertUserTenant`. This creates a default tenant owned by the user if one does not already exist.
- The first tenant name is included in the JWT via the `tenant` claim for backward compatibility. All tenant names and IDs (including the first) are exposed through the `tenants` claim.

## Web / Portal

The portal stores the currently selected tenant ID using a Jotai atom exposed by
`useCurrentTenant`. Both the GraphQL `ApolloProvider` and the gRPC client
returned from `useDefangClient` read from this atom and attach the tenant ID to
every request using the `X-Defang-Tenant-Id` header. This ensures backend services
handle requests in the context of the active tenant without components manually
passing IDs around.

After a tenant is created the portal refreshes the authentication token using
only the stored refresh token. Doing so issues new JWT claims that immediately
include the newly created tenant.

## API / Stripe

The API service uses the `X-Defang-Tenant-Id` header to determine the tenant
ID for the request.



## External Tenants

Some tenants originate from external providers like GitHub. When a user
logs in we resolve any organizations they belong to and map them to
tenant IDs using UUID v5. These IDs are returned in the JWT under the
`externalTenants` claim. For GitHub we also include a `githubOrgs` claim
listing the raw organization names for backwards compatibility. The
`/userinfo` endpoint returns full details for the UUIDs so downstream
services can treat them the same as tenants created within Defang.
Duplicate organizations returned by the provider are ignored so each one
is only processed once per login.
