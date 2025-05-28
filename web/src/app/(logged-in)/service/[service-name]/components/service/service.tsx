"use client";

import { Loader } from "@/components/loader/loader";
import { PageLoading } from "@/components/page-loading/page-loading";
import { StatusIcon } from "@/components/status-icon/status-icon";
import { Mode } from "@/modules/defang/generated/fabric_pb";
import { COLORS } from "@/modules/mui/constants";
import { OpenInBrowser } from "@mui/icons-material";
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
import { FONTS } from "@/modules/mui/providers/theme-provider/theme-provider";

const Small = styled("small")`
  color: ${COLORS.darkGrey};
`;

const OpenIcon = styled(OpenInBrowser)`
  margin-left: 10px;
  margin-right: 5px;
  margin-bottom: -5px;
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

  const firstEndpoint =
    serviceInfo?.service?.domainname || serviceInfo?.publicFqdn;
  const isPublic = serviceInfo?.service.ports?.[0]?.mode === Mode.INGRESS;

  return (
    <Stack p={2} spacing={4} mb={10}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h1">
          <StatusIcon status={serviceInfo?.status} state={serviceInfo?.state} />
          {serviceInfo?.service?.name}
          <Small
            sx={{
              fontSize: "2.5rem",
              marginLeft: "10px",
              fontWeight: 400,
              fontFamily: FONTS.body.style.fontFamily,
              // allcaps
              textTransform: "uppercase",
              "& a": {
                color: COLORS.darkGrey,
                textDecoration: "none",
                fontSize: "0.8rem",
              },
            }}
          >
            {firstEndpoint && isPublic && (
              <a
                href={`https://${firstEndpoint}`}
                target="_blank"
                style={{
                  textDecoration: "none",
                }}
                title="Open in browser"
              >
                <OpenIcon />
                open
              </a>
            )}
          </Small>
        </Typography>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Typography variant="h2">Public Domain Name</Typography>
        <ClickableDetail
          title=""
          content={
            serviceInfo?.service?.domainname || serviceInfo?.publicFqdn || ""
          }
          fullWidth
        />
      </Stack>
      <Stack direction="column" spacing={1}>
        <Typography variant="h2">Details</Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 2 : 4}
          flexWrap="wrap"
          width="100%"
        >
          <ClickableDetail
            title="Container Image"
            content={
              serviceInfo?.service?.image ||
              serviceInfo?.service?.build?.context
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
        </Stack>
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
