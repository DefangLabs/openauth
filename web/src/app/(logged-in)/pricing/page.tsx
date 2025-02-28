"use client";

import { CustomPricingTable } from "@/components/custom-pricing-table/custom-pricing-table";
import { StripePricingTable } from "@/components/stripe-pricing-table/stripe-pricing-table";
import { SubscriptionTier } from "@/modules/defang/generated/fabric_pb";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";

function PricingPage() {
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

export default PricingPage;
