import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { useSearch } from "../use-search/use-search";

export function useFilteredServices() {
  const { services, loading, project } = useServices({ poll: 8000 });

  const { search } = useSearch();
  const filteredServices = services
    ?.filter(
      (service) =>
        service?.service?.name?.toLowerCase().includes(search.toLowerCase()) ||
        service?.endpoints
          ?.join()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service?.service?.image?.toLowerCase().includes(search.toLowerCase()),
    )
    .map((service) => {
      return {
        id: `${service.project}-${service.service.name}`,
        name: service.service?.name,
        fqdn: service.service?.domainname || service.endpoints?.[0],
        dockerImage: service.service?.image || service.service?.build?.context,
        port: service.service?.ports?.map((p) => p.target).join(" "),
        ...service,
        project: project || service.project,
      };
    });

  return {
    services: filteredServices,
    loading,
  };
}
