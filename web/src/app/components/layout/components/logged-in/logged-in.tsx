import { useLogout } from "@/modules/kratos/hooks/use-logout/use-logout";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { COLORS } from "@/modules/mui/constants";
import { useCurrentUserProfileQuery } from "@/modules/profiles/hooks/use-current-user-profile-query/use-current-user-profile-query";
import { Avatar, Chip, Container, Drawer, Stack, styled } from "@mui/material";
import { SIDEBAR_WIDTH } from "../../constants";
import Link from "next/link";
import { useName } from "@/modules/profiles/hooks/use-name/use-name";

const UserChip = styled(Chip)`
  height: 70px;
  border-radius: 35px;
  padding-right: 20px;
  background-color: ${COLORS.white};
`;

const UserAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

const Grow = styled("div")`
  flex-grow: 1;
`;

export function LoggedIn({ children }: { children: React.ReactNode }) {
  const logout = useLogout();
  const { session } = useSession();
  const query = useCurrentUserProfileQuery();
  const profile = query.data?.profilesByPk;
  const name = useName();

  if (!session) return null;

  return (
    <div>
      <Drawer
        PaperProps={{
          style: { backgroundColor: COLORS.lightGrey, width: SIDEBAR_WIDTH },
        }}
        variant="persistent"
        open
      >
        <Stack direction="column" p={2} flexGrow={1}>
          <div>
            <Link href="/account">
              <UserChip
                avatar={
                  <UserAvatar style={{ width: 60, height: 60 }}>U</UserAvatar>
                }
                label={name}
                onClick={() => null}
              />
            </Link>
          </div>
          <Grow />
          <div>
            <Chip avatar={<Avatar>P</Avatar>} label="Logout" onClick={logout} />
          </div>
        </Stack>
      </Drawer>
      <Container component="main" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {children}
      </Container>
    </div>
  );
}
