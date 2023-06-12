import { InsertProfileMutation } from "@/modules/profiles/graphql/mutations/insert-profile-mutation";
import { ProfileQuery } from "@/modules/profiles/graphql/queries/profile-query";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSession } from "../use-session/use-session";

export function useCreateProfile() {
  const { session } = useSession();
  const id = session?.identity.id;
  const { refetch: profileQuery } = useQuery(ProfileQuery, {
    skip: true,
  });
  const [insertProfileMutation] = useMutation(InsertProfileMutation);

  useEffect(() => {
    (async () => {
      if (false) {
        // if (id) {
        let profile = await profileQuery({
          id,
        });
        console.log("@@ pre: profile", profile);

        if (!!profile.data.profilesByPk) return;

        await insertProfileMutation({
          variables: {
            object: {
              name: session?.identity.traits.name,
            },
          },
        });

        profile = await profileQuery({ id });

        console.log("@@ post: profile", profile);
      }
    })();
  }, [id]);
}
