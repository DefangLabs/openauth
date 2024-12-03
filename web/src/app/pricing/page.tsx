"use client";

import { CustomPricingTable } from "@/components/custom-pricing-table/custom-pricing-table";
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
  const tierUnspecified =
    tier === undefined ||
    tier === SubscriptionTier.SUBSCRIPTION_TIER_UNSPECIFIED;

  if (isLoading) {
    return null;
  }

  if (tierUnspecified) {
    return <StripePricingTable />;
  }

  return <CustomPricingTable />;
}

const PricingPageOuter = LoginRequired(function SamplesPage() {
  return (
    <Loader>
      <PricingPageInner />
    </Loader>
  );
});

export default PricingPageOuter;
