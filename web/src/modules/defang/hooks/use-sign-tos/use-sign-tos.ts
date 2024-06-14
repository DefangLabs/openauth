import useSWR from "swr";
import { useDefangClient } from "../use-defang-client/use-defang-client";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";

export function useSignTos() {
  const defang = useDefangClient();
  const session = useSession();
  return useSWR(["defang/tos/sign", defang, session], async () => {
    if (!session || !defang) return;

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
