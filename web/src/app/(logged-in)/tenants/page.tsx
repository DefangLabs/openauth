import { requireAuth } from "@/modules/auth/lib/require-auth";
import { Tenants } from "./components/tenants/tenants";

export default async function TenantsPage() {
  await requireAuth({ redirectPath: "/tenants" });
  return <Tenants />;
}
