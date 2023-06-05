import { Session } from "@ory/client";
import { atom, useAtom } from "jotai";

export const sessionAtom = atom<{
  session?: Session;
  loading: boolean;
  error?: Error;
}>({ loading: false });

export function useSession() {
  const [{ session, loading, error }, setSession] = useAtom(sessionAtom);

  return {
    session,
    loading,
    error,
    setSession,
  };
}
