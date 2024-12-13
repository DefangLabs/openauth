import { analytics } from "@/modules/analytics/lib/analytics";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { useSignTos } from "@/modules/defang/hooks/use-sign-tos/use-sign-tos";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";
import { useLogout } from "@/modules/kratos/hooks/use-logout/use-logout";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { COLORS, GRADIENTS } from "@/modules/mui/constants";
import { useName } from "@/modules/profiles/hooks/use-name/use-name";
import {
  Article,
  ChevronRight,
  Download,
  Forum,
  GitHub,
  Layers,
  OpenInNew,
  TipsAndUpdates,
} from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Avatar,
  Box,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import md5 from "md5";
import Link from "next/link";
import { useEffect } from "react";
import { SIDEBAR_WIDTH } from "../../constants";
import { NavButton } from "./components/nav-button/nav-button";
import { NAV_SURFACE } from "./constants";
import { useSidebarOpen } from "./hooks/use-sidebar-open/use-sidebar-open";

const UserChip = styled(Chip)`
  ${NAV_SURFACE}
  height: 50px;
  border-radius: 25px;
  width: 100%;
`;

const LogoutChip = styled(Chip)`
  ${NAV_SURFACE}
`;

const UserLabel = styled(Typography)`
  min-width: 100px;
  font-size: 1rem;
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div:first-child {
    font-size: 0.8rem;
  }
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
  const { session, loading } = useSession();
  const name = useName();
  const email =
    (useSession()?.session?.identity?.traits?.email as string) || "";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { sidebarOpen, setSidebarOpen } = useSidebarOpen();
  useSignTos();
  const { data, isLoading: whoamiLoading } = useWhoami();
  const userId = data?.userId;

  const client = useDefangClient();
  const track = !!session && !loading;

  useEffect(() => {
    if (!track || !userId || whoamiLoading) return;

    analytics.identify(userId);
  }, [client, track, userId, whoamiLoading]);

  if (!session) return null;

  return (
    <>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: COLORS.primary,
            backgroundImage: GRADIENTS.primary,
            width: isMobile ? "calc(100vw - 100px)" : SIDEBAR_WIDTH,
            border: "none",
            borderRadius: 0,
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
      >
        <Stack direction="column" p={1} flexGrow={1} spacing={4}>
          <div>
            <Link href="/account" onClick={() => setSidebarOpen(false)}>
              <UserChip
                avatar={
                  <UserAvatar
                    style={{ width: 40, height: 40, backgroundColor: "white" }}
                    src={`//www.gravatar.com/avatar/${md5(
                      (email || "").toLowerCase().trim(),
                    )}?d=identicon`}
                  >
                    <div>{(name || "U").charAt(0)}</div>
                  </UserAvatar>
                }
                label={
                  <UserLabel>
                    <div>{name}</div>
                    <div
                      style={{
                        fontSize: "x-small",
                        opacity: 0.75,
                      }}
                    >
                      My Account
                    </div>
                  </UserLabel>
                }
                onClick={() => null}
                sx={{
                  "& .MuiChip-label": {
                    flexGrow: 1,
                  },
                }}
              />
            </Link>
          </div>
          {/* <ServiceStats /> */}
          <Stack direction="column" spacing={1}>
            <NavButton
              href="/service"
              iconLeft={<ChevronRight sx={{ mr: 1 }} fontSize="small" />}
            >
              Playground Projects
            </NavButton>
            <NavButton
              href="/sample"
              iconLeft={<TipsAndUpdates sx={{ mr: 1 }} fontSize="small" />}
            >
              Samples
            </NavButton>
            <NavButton
              href="/pricing"
              iconLeft={<Layers sx={{ mr: 1 }} fontSize="small" />}
            >
              Subscription
            </NavButton>
            <NavButton
              href="https://docs.defang.io/docs/intro"
              iconLeft={<Article sx={{ mr: 1 }} fontSize="small" />}
              iconRight={
                <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
              }
            >
              Documentation
            </NavButton>
            <NavButton
              href="https://docs.defang.io/docs/getting-started#install-the-defang-cli"
              iconLeft={<Download sx={{ mr: 1 }} fontSize="small" />}
              iconRight={
                <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
              }
            >
              Install Defang CLI
            </NavButton>
            <NavButton
              href="https://github.com/DefangLabs/defang/issues"
              iconLeft={<GitHub sx={{ mr: 1 }} fontSize="small" />}
              iconRight={
                <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
              }
            >
              GitHub Issues
            </NavButton>
            <NavButton
              href="http://s.defang.io/discord"
              iconLeft={<Forum sx={{ mr: 1 }} fontSize="small" />}
              iconRight={
                <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
              }
            >
              Join Discord{" "}
            </NavButton>
            {/* <NavButton href="https://join.slack.com/share/enQtNTcyNDY0NDMyMzM3Ny00NmU3NzY1ZGI5NTY4ZDcyYjA4NDUzMTdlZjBlYmIzZTNhYTVhOGVjNDk0NWU5YmRmMzQzN2I0MzhjM2I0MjEx">
              Join Slack{" "}
              <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
            </NavButton> */}
          </Stack>
          <Grow />
          <Stack
            direction="row"
            alignItems="center"
            alignContent="center"
            justifyContent="space-between"
          >
            <LogoutChip
              avatar={
                <Avatar
                  sx={{
                    backgroundColor: "white",
                    marginLeft: "3px !important",
                  }}
                >
                  <PowerSettingsNewIcon />
                </Avatar>
              }
              label="Logout"
              onClick={logout}
              sx={{
                "& .MuiChip-label": {
                  color: "white",
                  fontSize: "0.8rem",
                },
              }}
            />
            <Typography
              sx={{ color: "white", opacity: 0.5, fontSize: "0.8rem" }}
            >
              {process.env.NEXT_PUBLIC_VERSION}
            </Typography>
          </Stack>
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
              boxShadow: (theme) => theme.shadows[1],
              backdropFilter: "blur(5px)",
            }}
            style={{
              boxSizing: "border-box",
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
