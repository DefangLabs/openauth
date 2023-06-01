import { Session } from "@ory/client";
import { atom, useAtom } from "jotai";

export const sessionAtom = atom<Session | null>(null);

export function useSession() {
  const [session, setSession] = useAtom(sessionAtom);

  return {
    session,
    setSession,
  };
}
