# Tenants Overview

This document will summarize how tenant management works in the portal. 

## Auth Service

- When a user first authenticates the auth service calls `upsertUserTenant`. This creates a default tenant owned by the user if one does not already exist.
- The first tenant name is included in the JWT via the `tenant` claim for backward compatibility. All tenant names and IDs (including the first) are exposed through the `tenants` claim.

## Web / Portal 

TODO

## API / Stripe

TODO
