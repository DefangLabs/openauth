"use client";

import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { COLORS } from "@/modules/mui/constants";
import { Circle, OpenInNew } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Icon,
  Stack,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ClickableDetail } from "./components/clickable-detail/clickable-detail";
import { Endpoints } from "./components/endpoints/endpoints";
import { Environment } from "./components/environment/environment";
import { Logs } from "./components/logs/logs";
import { useService } from "./hooks/use-service/use-service";

const Small = styled("small")`
  color: ${COLORS.darkGrey};
`;

const OpenIcon = styled(OpenInNew)`
  margin-left: 5px;
  cursor: pointer;
`;

export default LoginRequired(function ServicePage() {
  const { service, loading } = useService();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return (
      <Box
        width="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Stack direction="column" spacing={2} alignItems="center">
          <CircularProgress />
          <Typography variant="h2">Loading...</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack p={2} spacing={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h1">
          <Tooltip title={service?.status}>
            <Icon
              style={{
                color:
                  service?.status === "SERVICE_STEADY_STATE" ? "green" : "red",
              }}
              sx={{ mr: 1 }}
            >
              <Circle />
            </Icon>
          </Tooltip>
          {service?.service?.name}
          <Small>
            {` service `}
            <OpenIcon
              onClick={() => window.open(`https://${service?.endpoints?.[0]}`)}
            />
          </Small>
        </Typography>
      </Stack>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 2 : 4}
        flexWrap="wrap"
        width="100%"
      >
        <ClickableDetail
          title="Image"
          content={service?.service?.image || ""}
        />
        <ClickableDetail title="ETag" content={service?.etag || ""} />
        <ClickableDetail
          title="Private FQDN"
          content={service?.privateFqdn || ""}
        />
        <ClickableDetail
          title="Public FQDN"
          content={service?.publicFqdn || ""}
        />
        {service?.endpoints.length === 1 && (
          <ClickableDetail
            title="Public URL"
            content={service?.endpoints?.[0] || ""}
          />
        )}
        {service?.endpoints.length === 1 && (
          <ClickableDetail
            title="Port"
            content={service?.service?.ports?.[0]?.target || ""}
          />
        )}
      </Stack>
      <Endpoints />
      <Logs />
      <Environment />
    </Stack>
  );
}) as any;
