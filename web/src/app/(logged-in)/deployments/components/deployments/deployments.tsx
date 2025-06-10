"use client";

import { Loader } from "@/components/loader/loader";
import { PageLoading } from "@/components/page-loading/page-loading";
import { DeploymentType } from "@/modules/defang/generated/fabric_pb";
import {
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useListDeployments } from "../../../service/[service-name]/hooks/use-list-deployments/use-list-deployments";

function DeploymentsPageInner() {
  const { data: response, isLoading } = useListDeployments({
    deploymentType: DeploymentType.ACTIVE,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return <PageLoading />;
  }

  const PROVIDERS = ["UNSPECIFIED", "DEFANG", "AWS", "DIGITALOCEAN", "GCP"];

  const rows =
    response?.deployments.map((deployment) => {
      return {
        id: deployment.id,
        project: deployment.project,
        provider: PROVIDERS[deployment.provider],
        providerAccountId: deployment.providerAccountId,
        timestamp: deployment.timestamp?.toDate().toLocaleString() ?? "N/A",
        region: deployment.region,
      };
    }) ?? [];

  if (rows.length >= 0) {
    return (
      <Stack p={2} spacing={2} height={"100%"}>
        <Typography variant="h1">Deployments</Typography>
        <Card sx={{ p: 4 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            width={"100%"}
            >
            <DataGrid
              style={{ width: "100%", flexGrow: 1 }}
              autoHeight
              pageSizeOptions={[15]}
              columns={[
                {
                  flex: 1,
                  field: "timestamp",
                  headerName: "Timestamp",
                  minWidth: 150
                },
                {
                  flex: 1,
                  field: "id",
                  headerName: "Id",
                  minWidth: 200
                },
                {
                  flex: 1,
                  field: "project",
                  headerName: "Project",
                  minWidth: 200
                },
                {
                  flex: 1,
                  field: "provider",
                  headerName: "Provider",
                  minWidth: 150
                },
                {
                  flex: 1,
                  field: "providerAccountId",
                  headerName: "Account",
                  minWidth: 150
                },
                {
                  flex: 1,
                  field: "region",
                  headerName: "Region",
                  minWidth: 150
                },
              ]}
              rows={rows || []}
            />
          </Stack>
        </Card>
      </Stack>
    );
  } else {
    return (
      <Stack p={2} spacing={2} flexGrow={1}>
        <Typography variant="h1">Deployments</Typography>
      </Stack>
    );
  }
}

export default function DeploymentsPage() {
  return (
    <Loader>
      <DeploymentsPageInner />
    </Loader>
  );
}
