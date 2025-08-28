import { RequireAuth } from "@/modules/auth/components/require-auth/require-auth";
import { Pricing } from "./components/pricing/pricing";

export default async function PricingPage() {
  return (
    <RequireAuth redirectPath="/pricing">
      <Pricing />
    </RequireAuth>
  );
}
