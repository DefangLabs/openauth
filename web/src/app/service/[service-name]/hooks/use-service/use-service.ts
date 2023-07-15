import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { atom, useAtom } from "jotai";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const serviceAtom = atom<
  NonNullable<ReturnType<typeof useServices>["services"]>[number] | undefined
>(undefined);

export function useService() {
  const [service, setService] = useAtom(serviceAtom);
  const { services, loading } = useServices({ skip: !!service });
  const searchParams = useSearchParams();
  const params = useParams();
  const name =
    params["service-name"] || searchParams.get("service-name") || undefined;

  useEffect(() => {
    if (!name || !services) return;
    setService(services.find((service) => service.service?.name === name));

    return () => {
      setService(undefined);
    };
  }, [name, services, setService]);

  return {
    loading,
    service: services.find((service) => service.service?.name === name),
  };
}
