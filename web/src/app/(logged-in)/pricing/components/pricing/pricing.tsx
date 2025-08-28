"use client";

import { CustomPricingTable } from "@/components/custom-pricing-table/custom-pricing-table";
import { PageLoading } from "@/components/page-loading/page-loading";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";

export function Pricing() {
  const { data, isLoading } = useWhoami();

  if (isLoading || !data) {
    return <PageLoading />;
  }

  return <CustomPricingTable />;
}
