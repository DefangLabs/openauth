/**
 * Inserts a row into `tenantMembers` to associate a user with a tenant.
 * The mutation assumes the user already exists and simply links them to the
 * tenant using the provided role.
 */
import { graphql } from "@/generated/graphql";

export const inviteTenantMemberMutation = graphql(`
  mutation InviteTenantMember(
    $tenantId: uuid!
    $userId: uuid!
    $role: String = "member"
  ) {
    member: insertTenantMembersOne(
      object: { tenantId: $tenantId, userId: $userId, role: $role }
    ) {
      tenantId
      userId
    }
  }
`);
