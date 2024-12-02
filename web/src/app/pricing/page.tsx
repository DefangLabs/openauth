"use client";

import { Loader } from "@/components/loader/loader";
import { StripePricingTable } from "@/components/stripe-pricing-table/stripe-pricing-table";
import { SubscriptionManagement } from "@/components/subscription-management/subscription-management";
import { SubscriptionTier } from "@/modules/defang/generated/fabric_pb";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { Card, Stack } from "@mui/material";

function PricingPageInner() {
  const { data, isLoading } = useWhoami();
  const tier = data?.tier;
  const showPricing = tier === undefined || tier === SubscriptionTier.HOBBY;

  if (isLoading) {
    return null;
  }

  return showPricing ? (
    <StripePricingTable />
  ) : (
    <Stack maxWidth={400} width="100%" p={2}>
      <Card>
        <Stack p={2}>
          <SubscriptionManagement />
        </Stack>
      </Card>
    </Stack>
  );
}

const PricingPageOuter = LoginRequired(function SamplesPage() {
  return (
    <Loader>
      <PricingPageInner />
    </Loader>
  );
});

export default PricingPageOuter;
