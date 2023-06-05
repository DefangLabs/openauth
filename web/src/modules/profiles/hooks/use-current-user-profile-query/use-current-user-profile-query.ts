import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { useUserProfileQuery } from "../use-user-profile-query/use-user-profile-query";

export function useCurrentUserProfileQuery() {
  const { session } = useSession();
  return useUserProfileQuery({ id: session?.identity.id });
}
