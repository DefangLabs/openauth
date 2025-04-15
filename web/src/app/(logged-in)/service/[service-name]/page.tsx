import { requireAuth } from "@/modules/auth/lib/require-auth";
import Service from "./components/service/service";

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ ["service-name"]?: string }>;
  searchParams: Promise<{ ["service-name"]?: string }>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const serviceName =
    awaitedParams["service-name"] || awaitedSearchParams["service-name"];

  await requireAuth({
    redirectPath: `/service/${serviceName}`,
  });

  return <Service />;
}
