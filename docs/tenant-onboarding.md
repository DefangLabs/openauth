# Tenant Onboarding Flow

This document describes the tenant creation wizard introduced in the web
interface.  The flow is intentionally minimal and will evolve as more backend
support becomes available.

1. **Create Tenant**
   - The user enters a team name which is converted to a slug.
   - The slug is stored as the tenant's `name` field.
   - A short explanation clarifies that a tenant is similar to a team and has its
     own billing and access control.

2. **TODO: Invite Teammates**
   - After creation, a screen shows a mock invite link that can be shared with
     others.  Real invite management will be added later.

3. **Choose a Plan**
   - The final step displays the custom pricing table.
   - A *Skip for now* button lets the user continue on the free tier and
     redirects to the projects page if they have no other tenants.
