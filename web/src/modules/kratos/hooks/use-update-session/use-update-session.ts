import { Session } from "@ory/client";
import { useCallback } from "react";
import { kratosClient } from "../../lib/kratos-client/kratos-client";
import { useSession } from "../use-session/use-session";

interface UseUpdateSessionOptions {
  onSuccess?: (session: Session) => void;
  onError?: (error: any) => void;
}

export function useUpdateSession() {
  const { setSession } = useSession();

  return useCallback(
    async ({ onSuccess, onError }: UseUpdateSessionOptions = {}) => {
      setSession((prev) => ({
        ...prev,
        loading: true,
      }));

      try {
        const { data } = await kratosClient.toSession();
        const session = data;
        setSession((prev) => ({
          ...prev,
          session,
          loading: false,
        }));
        onSuccess?.(session);
      } catch (error: any) {
        setSession((prev) => ({
          ...prev,
          session: undefined,
          error,
          loading: false,
        }));
        onError?.(error);
      }
    },
    [setSession],
  );
}
