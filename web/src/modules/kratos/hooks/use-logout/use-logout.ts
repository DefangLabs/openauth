import { useRouter } from "next/navigation";
import { kratosClient } from "../../lib/kratos-client/kratos-client";

export function useLogout() {
  const router = useRouter();
  return async function logout() {
    const logoutFlow = await kratosClient.createBrowserLogoutFlow();
    router.push(logoutFlow.data.logout_url);
  };
}
