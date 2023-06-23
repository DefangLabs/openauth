import { useRouter } from "next/navigation";
import { kratosClient } from "../../lib/kratos-client/kratos-client";
import { useSession } from "../use-session/use-session";

export function useLogout() {
  const router = useRouter();
  const { setSession } = useSession();
  return async function logout() {
    const logoutFlow = await kratosClient.createBrowserLogoutFlow();
    setSession({ session: undefined, loading: false });
    router.push(logoutFlow.data.logout_url);
  };
}
