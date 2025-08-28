import { RequireAuth } from "@/modules/auth/components/require-auth/require-auth";
import AwsMarketplaceSubscribeComponent from "./components/marketplace-subscription/marketplace-subscription";

export default async function AwsMarketplaceSubscribePage() {
  return (
    <RequireAuth redirectPath="/aws-marketplace-subscribe">
      <AwsMarketplaceSubscribeComponent />
    </RequireAuth>
  );
}
