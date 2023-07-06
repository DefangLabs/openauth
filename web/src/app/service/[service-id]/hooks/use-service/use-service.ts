import { useServiceRequest } from "@/modules/defang/hooks/use-service-request/use-service-request";
import { useParams, useSearchParams } from "next/navigation";

export function useService() {
  const searchParams = useSearchParams();
  const params = useParams();
  const id =
    params["service-id"] || searchParams.get("service-id") || undefined;
  return useServiceRequest(id);
}
