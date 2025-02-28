import useSWR from "swr";
import { useDefangClient } from "../use-defang-client/use-defang-client";
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";

export function useSignTos() {
  const defang = useDefangClient();
  const { claims } = useAccessToken();
  const id = claims?.properties?.id;
  return useSWR(["defang/tos/sign", defang, id], async () => {
    if (!id || !defang) return;

    await new Promise((resolve, reject) => {
      defang.signEULA({}, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });

    return true;
  });
}
