"use client";

/**
 * Renders the list of members for a tenant and exposes a simple form for
 * inviting additional users by email.  This component relies entirely on
 * GraphQL queries and mutations – there is no bespoke API layer involved.
 */
import { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import {
  Stack,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { useTenantMembersQuery } from "@/modules/tenants/hooks/use-tenant-members-query";
import { inviteTenantMemberMutation } from "@/modules/tenants/graphql/mutations/invite-tenant-member-mutation";
import { useUserByEmailQuery } from "@/modules/users/hooks/use-user-by-email-query";

export function TenantMembers({ tenantId }: { tenantId: string }) {
  const { data, refetch } = useTenantMembersQuery(tenantId);
  const [invite] = useMutation(inviteTenantMemberMutation);
  const [loadUser] = useUserByEmailQuery();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onInvite = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) return;

    const { data: userData } = await loadUser({ variables: { email } });
    const user = userData?.users?.[0];
    if (!user) {
      setError("User not found");
      return;
    }
    await invite({ variables: { tenantId, userId: user.id } });
    setEmail("");
    refetch();
  };

  return (
    <Stack spacing={2} p={2} maxWidth={(t) => t.breakpoints.values.md}>
      <Typography variant="h2">Members</Typography>
      <form onSubmit={onInvite}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Invite
          </Button>
        </Stack>
        {error && <Typography color="error">{error}</Typography>}
      </form>
      <List>
        {data?.tenantMembers.map((m) => (
          <ListItem key={m.user.id}>
            {m.user.email} – {m.role ?? "member"}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
