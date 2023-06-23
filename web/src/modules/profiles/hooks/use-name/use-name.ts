import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { useQuery } from "@apollo/client";
import { ProfileQuery } from "../../graphql/queries/profile-query";
import { useEffect } from "react";

export function useName() {
  const { session } = useSession();
  const id = session?.identity?.id;
  const { data, refetch } = useQuery(ProfileQuery, {
    variables: { id: session?.identity?.id },
    skip: !session?.identity?.id,
  });

  useEffect(() => {
    if (id) {
      refetch({ id: session?.identity?.id });
    }
  }, [id, refetch, session?.identity?.id]);

  const profileName = data?.profilesByPk?.name;

  if (profileName) return profileName;

  let name = "Defang User";

  if (session?.identity?.traits?.name?.first) {
    name = session.identity.traits.name.first;
  } else if (session?.identity?.traits?.email) {
    name = session?.identity?.traits?.email;
  }

  return name;
}
