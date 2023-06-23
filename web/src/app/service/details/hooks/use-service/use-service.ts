import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { useParams, useSearchParams } from "next/navigation";

export function useService() {
  const services = useServices();
  const params = useSearchParams();
  const id = params.get("id");
  return services.find((service) => service.id === id);
}
