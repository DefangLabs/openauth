import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { useSearch } from "../use-search/use-search";

export function useFilteredServices() {
  const services = useServices();

  const { search } = useSearch();
  return (services || [])
    .filter(
      (service) =>
        service.service?.name.toLowerCase().includes(search.toLowerCase()) ||
        service.fqdn.toLowerCase().includes(search.toLowerCase()) ||
        service.service?.image.toLowerCase().includes(search.toLowerCase())
    )
    .map((service) => ({
      id: service.etag,
      name: service.service?.name,
      fqdn: service.fqdn,
      dockerImage: service.service?.image,
      port: service.service?.portsList[0]?.target,
    }));
}
