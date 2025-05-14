"use client";

import { Loader } from "@/components/loader/loader";
import { PageLoading } from "@/components/page-loading/page-loading";
import { StatusIcon } from "@/components/status-icon/status-icon";
import { Mode } from "@/modules/defang/generated/fabric_pb";
import { COLORS } from "@/modules/mui/constants";
import { OpenInNew } from "@mui/icons-material";
import {
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { quote } from "shell-quote";
import { useService } from "../../hooks/use-service/use-service";
import { ClickableDetail } from "../clickable-detail/clickable-detail";
import { Endpoints } from "../endpoints/endpoints";
import { Environment } from "../environment/environment";
import { Logs } from "../logs/logs";

const Small = styled("small")`
  color: ${COLORS.darkGrey};
`;

const OpenIcon = styled(OpenInNew)`
  margin-left: 5px;
  cursor: pointer;
  color: ${COLORS.darkGrey};
`;

function ProjectsPageInner() {
  const { service: serviceInfo, loading } = useService({ poll: 8000 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return <PageLoading />;
  }

  const firstEndpoint = serviceInfo?.endpoints?.[0];
  const isPublic = serviceInfo?.service.ports?.[0]?.mode === Mode.INGRESS;

  return (
    <Stack p={2} spacing={4} mb={10}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h1">
          <StatusIcon status={serviceInfo?.status} state={serviceInfo?.state} />
          {serviceInfo?.service?.name}
          <Small>
            {` service `}
            {firstEndpoint && isPublic && (
              <a href={`https://${firstEndpoint}`} target="_blank">
                <OpenIcon />
              </a>
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
          content={
            serviceInfo?.service?.image || serviceInfo?.service?.build?.context
          }
        />
        <ClickableDetail
          title="Deployment ID / ETag"
          content={serviceInfo?.etag || ""}
        />
        <ClickableDetail
          title="Command"
          content={quote(serviceInfo?.service?.command ?? [])}
        />
        <ClickableDetail
          title="Private Domain Name"
          content={serviceInfo?.privateFqdn || ""}
        />
        <ClickableDetail
          title="Public Domain Name"
          content={
            serviceInfo?.service?.domainname || serviceInfo?.publicFqdn || ""
          }
        />
      </Stack>
      <Endpoints />
      <Logs />
      <Environment />
      {/* <Secrets /> */}
    </Stack>
  );
}

export default function ProjectsPage() {
  return (
    <Loader>
      <ProjectsPageInner />
    </Loader>
  );
}
