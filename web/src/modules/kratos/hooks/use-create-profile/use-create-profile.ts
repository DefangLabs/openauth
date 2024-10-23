import { InsertProfileMutation } from "@/modules/profiles/graphql/mutations/insert-profile-mutation";
import { ProfileQuery } from "@/modules/profiles/graphql/queries/profile-query";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSession } from "../use-session/use-session";
import { useName } from "@/modules/profiles/hooks/use-name/use-name";

export function useCreateProfile() {
  const { session } = useSession();
  const name = useName();
  const id = session?.identity?.id;
  const { refetch: profileQuery } = useQuery(ProfileQuery, {
    skip: !id,
  });
  const [insertProfileMutation] = useMutation(InsertProfileMutation);

  useEffect(() => {
    (async () => {
      if (id) {
        let profile = await profileQuery({
          id,
        });

        if (!!profile.data.profilesByPk) return;

        await insertProfileMutation({
          variables: {
            object: {
              name,
            },
          },
        });

        profile = await profileQuery({ id });
      }
    })();
  }, [id, insertProfileMutation, name, profileQuery]);
}
