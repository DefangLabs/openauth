import { requireAuth } from "@/modules/auth/lib/require-auth";
import { Pricing } from "./components/pricing/pricing";

export default async function PricingPage() {
  await requireAuth({
    redirectPath: "/pricing",
  });

  return <Pricing />;
}
