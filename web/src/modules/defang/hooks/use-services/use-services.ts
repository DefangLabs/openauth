import { useEffect, useMemo, useState } from "react";
import { Services } from "../../generated/fabric_pb";
import { useDefangClient } from "../use-defang-client/use-defang-client";
import { atom, useAtom } from "jotai";

interface UseServicesOpts {
  skip?: boolean;
}

const servicesAtom = atom<Services["services"]>([]);

export function useServices({ skip }: UseServicesOpts | undefined = {}) {
  const [services, setServices] = useAtom(servicesAtom);
  const [loading, setLoading] = useState(false);
  const client = useDefangClient();

  useEffect(() => {
    if (skip) return;
    setLoading(true);
    client?.getServices({}, (err, res) => {
      if (err) {
        console.log("@@ error getting services", err);
        setLoading(false);
        return;
      }
      setServices(res.services);
      setLoading(false);
    });
  }, [client, setServices, skip]);

  const memoServices = useMemo(() => {
    return services?.map((service) => {
      const regex = /(\b\w+:\b)[^@]+(@)/i;
      return {
        ...service,
        service: {
          ...service.service,
          image: service.service?.image?.replace(regex, "$1***$2"),
        },
      };
    });
  }, [services]);

  return {
    services: memoServices,
    loading,
  };
}
