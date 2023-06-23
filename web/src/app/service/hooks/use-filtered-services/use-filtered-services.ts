import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { useSearch } from "../use-search/use-search";

export function useFilteredServices() {
  const services = useServices();
  const { search } = useSearch();
  return services.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.fqdn.toLowerCase().includes(search.toLowerCase()) ||
      service.dockerImage.toLowerCase().includes(search.toLowerCase()) ||
      service.privateDomain.toLowerCase().includes(search.toLowerCase())
  );
}
