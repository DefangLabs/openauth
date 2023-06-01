import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { kratosClient } from "../../lib/kratos-client/kratos-client";
import { useSession } from "../use-session/use-session";

export function useUpdateSession() {
  const { setSession } = useSession();
  const router = useRouter();

  return useCallback(
    (redirect: boolean) => {
      kratosClient
        .toSession()
        .then(({ data: session }) => {
          setSession(session);
        })
        .catch((error) => {
          setSession(null);
          if (error.message) {
            return (
              redirect &&
              router.push(
                `/auth/login?error=${encodeURIComponent(error.message)}`
              )
            );
          }
          return (
            redirect &&
            router.push(
              `/auth/login?error=${encodeURIComponent(JSON.stringify(error))}`
            )
          );
        });
    },
    [router, setSession]
  );
}
