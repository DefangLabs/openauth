"use client";

/**
 * TenantOnboarding guides the user through creating a new tenant and completing
 * a short setup flow.  The component intentionally keeps the logic small and
 * declarative so future steps can be added without increasing complexity.
 *
 * Step 1 - Tenant creation
 *   - User enters a human friendly name for the tenant.
 *   - We show a short explanation about what a tenant represents.
 *
 * Step 2 - TODO: Invitation
 *   - Displays a mock invite link that can be shared with teammates.
 *
 * Step 3 - Pricing
 *   - Shows the custom pricing table with an option to skip and continue on the
 *     free tier.
 *   - Only shows the free tier if the user has no existing tenants.
 */

import { CustomPricingTable } from "@/components/custom-pricing-table/custom-pricing-table";
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { createTenantMutation } from "@/modules/tenants/graphql/mutations/create-tenant-mutation";
import { useCurrentTenantId } from "@/modules/tenants/hooks/use-current-tenant-id";
import { useTenantsQuery } from "@/modules/tenants/hooks/use-tenants-query";
import { useMutation } from "@apollo/client";
import {
  Alert,
  Button,
  Container,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function TenantOnboarding() {
  const [createTenant, { loading }] = useMutation(createTenantMutation);
  const { setCurrentTenantId } = useCurrentTenantId();
  const router = useRouter();
  const { refresh } = useAccessToken();
  const { data: tenantsQuery, refetch: refetchTenants } = useTenantsQuery();

  const hasTenants = (tenantsQuery?.tenants || []).length > 1;

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = name.trim().length > 0; // Simple validation to ensure name is not empty

  const submitTenant = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const { data, errors } = await createTenant({ variables: { name } });
      if (errors) {
        setError(errors[0].message || "Failed to create tenant");
        return;
      }
      const id = data?.tenant?.id;
      if (id) {
        setTenantId(id);
        setCurrentTenantId(id);
        // Reload the tenants list to update the UI (like the tenant switcher)
        await refetchTenants();
      }
      setStep(3);
    } catch (err) {
      setError("An unexpected error occurred while creating the tenant");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  if (step === 1) {
    return (
      <Stack spacing={2} p={2} maxWidth={(t) => t.breakpoints.values.md}>
        <Typography variant="h1">Create Tenant</Typography>
        <Typography>
          A tenant represents a team. Each tenant has its own billing and access
          control and all your apps belong to a tenant.
        </Typography>
        <form onSubmit={submitTenant}>
          <Stack spacing={2} direction="column">
            <TextField
              label="Tenant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="Enter the name for your tenant"
              error={!!name && !isValid}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || loading}
            >
              Create Tenant
            </Button>
          </Stack>
        </form>
      </Stack>
    );
  }

  if (step === 2) {
    const inviteUrl = `https://example.com/invite/${tenantId ?? "tenant"}`;
    return (
      <Stack spacing={2} p={2} maxWidth={(t) => t.breakpoints.values.md}>
        <Typography variant="h1">Invite Teammates</Typography>
        <Typography>
          Share this link with your teammates so they can join your tenant.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography>{inviteUrl}</Typography>
        </Paper>
        <Button variant="contained" onClick={() => setStep(3)}>
          Next
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} p={2} maxWidth={(t) => t.breakpoints.values.md}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h1">Choose a Plan</Typography>
        {!hasTenants && (
          <Button onClick={() => router.push("/projects")}>Skip for now</Button>
        )}
      </Stack>
      <CustomPricingTable embedded hideFreeTier={hasTenants} />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
