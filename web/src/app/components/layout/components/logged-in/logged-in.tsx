import { useCurrentUserProfileQuery } from "@/common/hooks/use-current-user-profile-query/use-current-user-profile-query";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { Typography } from "@mui/material";

export function LoggedIn({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const query = useCurrentUserProfileQuery();
  const profile = query.data?.profilesByPk;
  if (!session) return null;
  return (
    <div>
      <aside>
        <Typography>{session.identity?.traits?.email}</Typography>
        <Typography>{profile?.name || "No name"}</Typography>
      </aside>
      <main>{children}</main>
    </div>
  );
}
