import { useCallback } from "react";
import { useDefangClient } from "../use-defang-client/use-defang-client";
import { WhoAmIResponse } from "../../generated/fabric_pb";
import useSWR from "swr";

export function useWhoami() {
  const client = useDefangClient();

  const fetcher = useCallback(() => {
    return new Promise<WhoAmIResponse>((resolve, reject) => {
      if (!client) {
        return reject("Client not initialized");
      }
      client.whoAmI({}, (err, res) => {
        if (err) {
          console.error("@@ err whoami: ", err);
          reject(err);
        } else {
          resolve(res!);
        }
      });
    });
  }, [client]);

  return useSWR<WhoAmIResponse>(["defang/whoami", client], fetcher);
}
