import { useEffect, useMemo, useState } from "react";
import { ListServicesResponse } from "../../generated/fabric_pb";
import { useDefangClient } from "../use-defang-client/use-defang-client";
import { atom, useAtom } from "jotai";

interface UseServicesOpts {
  skip?: boolean;
  poll?: number;
}

const servicesAtom = atom<ListServicesResponse["services"] | null>(null);

export function useServices({ skip, poll }: UseServicesOpts | undefined = {}) {
  const [services, setServices] = useAtom(servicesAtom);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState("");
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
      setProject(res.project);
      setServices(res.services);
      setLoading(false);
    });
  }, [client, setServices, skip, setProject]);

  useEffect(() => {
    if (!poll) return;
    const i = setInterval(() => {
      client?.getServices({}, (err, res) => {
        if (err) {
          console.log("@@ error getting services", err);
          return;
        }
        setProject(res.project);
        setServices(res.services);
      });
    }, poll);

    return () => clearInterval(i);
  }, [client, poll, setServices, setProject]);

  const memoServices = useMemo(() => {
    return services?.map((service) => {
      const regex = /^([^:]+:)[^@]+(@)/i;
      return {
        ...service,
        service: {
          ...service.service,
          image: service.service?.image?.replace(regex, "$1***$2"), // hide the password
        },
      };
    });
  }, [services]);

  return {
    services: memoServices,
    loading,
    project,
  };
}
