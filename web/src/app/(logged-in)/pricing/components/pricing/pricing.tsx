"use client";

import { CustomPricingTable } from "@/components/custom-pricing-table/custom-pricing-table";
import { PageLoading } from "@/components/page-loading/page-loading";
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";

export function Pricing() {
  const { data, isLoading } = useWhoami();
  const { token } = useAccessToken();

  if (isLoading || !token || !data) {
    return <PageLoading />;
  }

  return <CustomPricingTable />;
}
