import { useRouter } from "next/navigation";
import { kratosClient } from "../../lib/kratos-client/kratos-client";
import { useSession } from "../use-session/use-session";
import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";

export function useLogout() {
  const router = useRouter();
  const { setSession } = useSession();
  return async function logout() {
    analytics.track(EVENTS.logout);
    const logoutFlow = await kratosClient.createBrowserLogoutFlow();
    setSession({ session: undefined, loading: false });
    router.push(logoutFlow.data.logout_url);
  };
}
