import { useSession } from "@/modules/kratos/hooks/use-session/use-session";

export function useName() {
  const { session } = useSession();

  let name = "Defang User";

  if (session?.identity?.traits?.name?.first) {
    name = session.identity.traits.name.first;
  } else if (session?.identity?.traits?.email) {
    name = session?.identity?.traits?.email;
  }

  return name;
}
