import useSWR from "swr";
import { useDefangClient } from "../use-defang-client/use-defang-client";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";

export function useSignTos() {
  const defang = useDefangClient();
  const session = useSession();
  return useSWR("defang/tos/sign", async () => {
    if (!session || !defang) return;
    const checkResponse = await new Promise((resolve, reject) => {
      defang.checkToS({}, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });

    console.log("@@ checkResponse: ", checkResponse);

    if (!!checkResponse) {
      return;
    }

    const signResponse = await new Promise((resolve, reject) => {
      defang.signEULA({}, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });

    console.log("@@ signResponse: ", signResponse);

    return true;
  });
}
