"use client";

import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { COLORS } from "@/modules/mui/constants";
import { OpenInNew } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { ClickableDetail } from "./components/clickable-detail/clickable-detail";
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
      <Typography variant="h1">
        {service?.service?.name}
        <Small>
          {` service `}
          <OpenIcon
            onClick={() => window.open(`https://${service?.endpoints?.[0]}`)}
          />
        </Small>
      </Typography>
      <Stack direction="row" spacing={4} flexWrap="wrap">
        {service?.endpoints.length === 1 && (
          <ClickableDetail
            title="Public URL"
            content={service?.endpoints?.[0] || ""}
          />
        )}
        {/* <ClickableDetail
          title="Private URL"
          content={service?.privateDomain || ""}
        /> */}
        <ClickableDetail
          title="Image"
          content={service?.service?.image || ""}
        />
        <ClickableDetail
          title="Port"
          content={service?.service?.ports[0]?.target || ""}
        />
        {/* <ClickableDetail title="vCPU" content={service?.vcpus || ""} />
        <ClickableDetail title="Memory" content={service?.memory || ""} />
        <ClickableDetail
          title="KV Store"
          content={service?.kvConnectionUrl || ""}
        />
        <ClickableDetail
          title="Prometheus"
          content={service?.prometheusUrl || ""}
        /> */}
      </Stack>
      {(service?.endpoints?.length || 0) > 1 && (
        <Stack>
          <Typography variant="h2">Endpoints</Typography>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Port</TableCell>
                <TableCell>URL</TableCell>
              </TableRow>
            </TableHead>
            {service?.endpoints.map((endpoint, i) => (
              <TableRow key={endpoint}>
                <TableCell>{service.service?.ports[i]?.target}</TableCell>
                <TableCell>
                  <a href={`https://${endpoint}`}>{endpoint}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableContainer>
        </Stack>
      )}
      {/* <Usage />
      <MonthlyUsage /> */}
      <Logs />
    </Stack>
  );
}) as any;
