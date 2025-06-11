import {
  DeploymentType,
  ListDeploymentsResponse,
} from "@/modules/defang/generated/fabric_pb";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { useCallback, useState } from "react";
import useSWR from "swr";

interface UseListDeploymentsOpts {
  deploymentType?: DeploymentType;
}

export function useListDeployments(opts: UseListDeploymentsOpts) {
  const client = useDefangClient();

  const fetcher = useCallback(async () => {
    return await new Promise<ListDeploymentsResponse>((resolve, reject) => {
      client?.listDeployments({ type: opts.deploymentType }, (err, res) => {
        if (err) {
          console.error("@@ err listDeployments: ", err);
          reject(err);
        } else {
          resolve(res!);
        }
      });
    });
  }, [client, opts.deploymentType]);

  return useSWR<ListDeploymentsResponse>(
    !!client ? "defang/listdeployments" : null,
    fetcher,
  );
}
