import { requireAuth } from "@/modules/auth/lib/require-auth";
import { TenantMembers } from "../components/tenant-members/tenant-members";

export default async function TenantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAuth({ redirectPath: `/tenants/${id}` });
  return <TenantMembers tenantId={id} />;
}
