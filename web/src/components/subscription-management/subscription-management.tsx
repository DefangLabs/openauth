"use client";

import { getTierString } from "@/lib/tiers";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";
import { CreateStripePortalSessionMutation } from "@/modules/stripe/graphql/mutations/create-stripe-portal-session-mutation";
import { useMutation } from "@apollo/client";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export function SubscriptionManagement() {
  const { data, isLoading: whoamiLoading } = useWhoami();
  const [
    createStripePortalSession,
    { data: portalData, loading: dataLoading },
  ] = useMutation(CreateStripePortalSessionMutation);

  const portalUrl = portalData?.createStripePortalSession?.url;

  useEffect(() => {
    createStripePortalSession();
  }, [createStripePortalSession]);

  return (
    <form action={portalUrl} method="get">
      <Typography variant="h2">Subscription</Typography>
      <Typography>Manage your subscription on the Stripe portal.</Typography>
      <Typography>
        {whoamiLoading ? (
          <>&nbsp;</>
        ) : (
          <>
            You are currently subscribed to the{" "}
            <strong>{getTierString(data?.tier) || "free"}</strong> plan.
          </>
        )}
      </Typography>
      <Stack spacing={2} mt={2}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="flex-end"
        >
          <Button type="submit" variant="contained" disabled={dataLoading}>
            {dataLoading && <CircularProgress size={24} />}
            Go to Stripe
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
