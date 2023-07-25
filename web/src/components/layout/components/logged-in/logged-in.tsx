import { useLogout } from "@/modules/kratos/hooks/use-logout/use-logout";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { COLORS, GRADIENTS } from "@/modules/mui/constants";
import { useName } from "@/modules/profiles/hooks/use-name/use-name";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Menu from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Chip,
  Drawer,
  Icon,
  IconButton,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { SIDEBAR_WIDTH } from "../../constants";
import { NavButton } from "./components/nav-button/nav-button";
import { NAV_SURFACE } from "./constants";
import { useSidebarOpen } from "./hooks/use-sidebar-open/use-sidebar-open";
import md5 from "md5";
import { OpenInNew } from "@mui/icons-material";

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
  const email =
    (useSession()?.session?.identity?.traits?.email as string) || "";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { sidebarOpen, setSidebarOpen } = useSidebarOpen();

  if (!session) return null;

  return (
    <>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: COLORS.primary,
            backgroundImage: GRADIENTS.primary,
            width: isMobile ? "calc(100vw - 100px)" : SIDEBAR_WIDTH,
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
      >
        <Stack direction="column" p={2} flexGrow={1} spacing={4}>
          <div>
            <Link href="/account" onClick={() => setSidebarOpen(false)}>
              <UserChip
                avatar={
                  <UserAvatar
                    style={{ width: 60, height: 60, backgroundColor: "white" }}
                    src={`https://www.gravatar.com/avatar/${md5(
                      (email || "").toLowerCase().trim()
                    )}`}
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
          <Stack direction="column" spacing={1}>
            <NavButton href="/service">Services</NavButton>
            <NavButton href="https://docs.defang.io/docs/Intro">
              Documentation{" "}
              <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
            </NavButton>
            <NavButton href="https://github.com/defang-io/defang/releases">
              CLI Download{" "}
              <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
            </NavButton>
          </Stack>
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
      <Stack direction={isMobile ? "column" : "row"} width="100%">
        {!!isMobile && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              paddingTop: "5px",
              paddingLeft: "5px",
              height: "50px",
              background: "rgba(255,255,255,0.8)",
              boxSizing: "border-box",
              boxShadow: (theme) => theme.shadows[1],
              backdropFilter: "blur(5px)",
            }}
          >
            <IconButton onClick={() => setSidebarOpen(true)}>
              <Menu />
            </IconButton>
          </Box>
        )}
        <Box
          flexGrow={1}
          width={isMobile ? "100%" : undefined}
          sx={{
            marginLeft: {
              xs: 0,
              sm: `${SIDEBAR_WIDTH}px`,
            },
            marginTop: {
              xs: isMobile ? "50px" : 0,
            },
          }}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
}
