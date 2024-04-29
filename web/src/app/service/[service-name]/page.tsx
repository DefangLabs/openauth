"use client";

import { Loader } from "@/components/loader/loader";
import { StatusIcon } from "@/components/status-icon/status-icon";
import { Mode } from "@/modules/defang/generated/fabric_pb";
import { COLORS } from "@/modules/mui/constants";
import { OpenInNew } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Stack,
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

function ServicePageInner() {
  const { service, loading } = useService({ poll: 5000 });
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

  const firstEndpoint = service?.endpoints?.[0];
  const isPublic = service?.service.ports?.[0]?.mode === Mode.INGRESS;

  return (
    <Stack p={2} spacing={4} mb={10}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h1">
          <StatusIcon status={service?.status} />
          {service?.service?.name}
          <Small>
            {` service `}
            {firstEndpoint && isPublic && (
              <OpenIcon
                onClick={() =>
                  window.open(`https://${service?.endpoints?.[0]}`)
                }
              />
            )}
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
          title="Container Image"
          content={service?.service?.image || service?.service?.build?.context}
        />
        <ClickableDetail
          title="Deployment ID / ETag"
          content={service?.etag || ""}
        />
        <ClickableDetail
          title="Private Domain Name"
          content={service?.privateFqdn || ""}
        />
        <ClickableDetail
          title="Public Domain Name"
          content={service?.service?.domainname || service?.publicFqdn || ""}
        />
      </Stack>
      <Endpoints />
      <Logs />
      <Environment />
      {/* <Secrets /> */}
    </Stack>
  );
}

export default function ServicePage() {
  return (
    <Loader>
      <ServicePageInner />
    </Loader>
  );
}
