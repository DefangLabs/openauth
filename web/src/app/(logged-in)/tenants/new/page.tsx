import { requireAuth } from "@/modules/auth/lib/require-auth";
import { TenantOnboarding } from "./components/tenant-onboarding/tenant-onboarding";

export default async function NewTenantPage() {
  await requireAuth({ redirectPath: "/tenants/new" });
  return <TenantOnboarding />;
}
