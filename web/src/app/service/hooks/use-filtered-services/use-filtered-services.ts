import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { useSearch } from "../use-search/use-search";

export function useFilteredServices() {
  const { services, loading } = useServices({ poll: 5000 });

  const { search } = useSearch();
  const filteredServices = services
    ?.filter(
      (service) =>
        service?.service?.name?.toLowerCase().includes(search.toLowerCase()) ||
        service?.endpoints
          ?.join()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service?.service?.image?.toLowerCase().includes(search.toLowerCase())
    )
    .map((service) => {
      return {
        id: service.etag,
        name: service.service?.name,
        fqdn: service.service?.domainname || service.endpoints?.[0],
        dockerImage: service.service?.image,
        port: service.service?.ports?.map((p) => p.target).join(" "),
        ...service,
      };
    });

  return {
    services: filteredServices,
    loading,
  };
}
