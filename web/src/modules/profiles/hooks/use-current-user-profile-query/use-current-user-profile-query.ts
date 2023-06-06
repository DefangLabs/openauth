import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { useQuery } from "@apollo/client";
import { ProfileQuery } from "../../graphql/queries/profile-query";

export function useCurrentUserProfileQuery() {
  const { session } = useSession();
  return useQuery(ProfileQuery, {
    variables: { id: session?.identity.id },
    skip: !session?.identity.id,
  });
}
