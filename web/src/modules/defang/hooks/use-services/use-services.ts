import { useEffect, useState } from "react";
import { Services } from "../../generated/fabric_pb";
import { useDefangClient } from "../use-defang-client/use-defang-client";

export function useServices() {
  const [services, setServices] = useState<Services["services"]>([]);
  const [loading, setLoading] = useState(false);
  const client = useDefangClient();

  useEffect(() => {
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
  }, [client]);

  return {
    services,
    loading,
  };
}
