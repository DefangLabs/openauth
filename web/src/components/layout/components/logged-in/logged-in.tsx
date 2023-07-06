import { useLogout } from "@/modules/kratos/hooks/use-logout/use-logout";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { COLORS, GRADIENTS } from "@/modules/mui/constants";
import { useName } from "@/modules/profiles/hooks/use-name/use-name";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { SIDEBAR_WIDTH } from "../../constants";
import { ServiceStats } from "./components/service-stats/service-stats";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { NAV_SURFACE } from "./constants";
import { NavButton } from "./components/nav-button/nav-button";

const UserChip = styled(Chip)`
  ${NAV_SURFACE}
  height: 70px;
  border-radius: 35px;
  padding-right: 20px;
`;

const LogoutChip = styled(Chip)`
  ${NAV_SURFACE}
`;

const UserLabel = styled(Typography)`
  min-width: 100px;
`;
UserLabel.defaultProps = {
  variant: "h5",
  color: "white",
};

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
  const name = useName();

  if (!session) return null;

  return (
    <>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: COLORS.primary,
            backgroundImage: GRADIENTS.primary,
            width: SIDEBAR_WIDTH,
          },
        }}
        variant="persistent"
        open
      >
        <Stack direction="column" p={2} flexGrow={1} spacing={4}>
          <div>
            <Link href="/account">
              <UserChip
                avatar={
                  <UserAvatar
                    style={{ width: 60, height: 60, backgroundColor: "white" }}
                  >
                    {(name || "U").charAt(0)}
                  </UserAvatar>
                }
                label={<UserLabel>{name}</UserLabel>}
                onClick={() => null}
              />
            </Link>
          </div>
          {/* <ServiceStats /> */}
          <NavButton href="/service">Services</NavButton>
          <Grow />
          <div>
            <LogoutChip
              avatar={
                <Avatar style={{ backgroundColor: "white" }}>
                  <PowerSettingsNewIcon />
                </Avatar>
              }
              label="Logout"
              onClick={logout}
            />
          </div>
        </Stack>
      </Drawer>
      <Stack direction="row" width={"100%"}>
        <div style={{ width: SIDEBAR_WIDTH }} />
        <Box flexGrow={1}>{children}</Box>
      </Stack>
    </>
  );
}
