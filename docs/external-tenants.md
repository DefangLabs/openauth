# Externally Managed Tenants

Certain tenants are managed outside of Defang. Currently the only
supported provider is GitHub organizations. When a user logs in we
fetch their organizations and create a canonical tenant ID for each one
using UUID v5. The provider name forms the namespace and the provider
specific organization ID forms the value.
Each organization is only processed once per login even if the provider
returns duplicates, avoiding unnecessary lookups.

If a tenant with that ID does not already exist it is created and the
first user to log in becomes the owner. No membership records are
stored for other members of the organization. Instead the user's JWT
contains an `externalTenants` claim listing the UUIDs of all tenants
they have access to via the provider. For GitHub specifically we also
include the organization names in a legacy `githubOrgs` claim so older
clients continue to function.

The `/userinfo` endpoint merges tenants referenced in the token with
those owned or explicitly granted in Defang. This keeps authentication
stateless while still allowing services to resolve tenant details when
needed.

A `provider` column is added to the `tenants` table 
so each external tenant can be tagged with its origin.
