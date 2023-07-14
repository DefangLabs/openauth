import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { useParams, useSearchParams } from "next/navigation";

export function useService() {
  const { services, loading } = useServices();
  const searchParams = useSearchParams();
  const params = useParams();
  const name =
    params["service-name"] || searchParams.get("service-name") || undefined;
  return {
    loading,
    service: services.find((service) => service.service?.name === name),
  };
}
