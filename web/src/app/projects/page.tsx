"use client";

import { Loader } from "@/components/loader/loader";
import { StatusIcon } from "@/components/status-icon/status-icon";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { COLORS } from "@/modules/mui/constants";
import { HelpOutline, HelpOutlineTwoTone } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Link,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import DeleteWithConfirmationButton from "../../components/delete-with-confirmation-button";
import { EmptyServices } from "./components/empty-services/empty-services";
import { useFilteredServices } from "./hooks/use-filtered-services/use-filtered-services";
import { useSearch } from "./hooks/use-search/use-search";
import { PageLoading } from "@/components/page-loading/page-loading";

const Small = styled("small")`
  color: ${COLORS.darkGrey};
`;

function ProjectsPageInner() {
  const { services, loading, expiresAt, project } = useFilteredServices();
  const { search, setSearch } = useSearch();
  const router = useRouter();
  const client = useDefangClient();

  const handleDelete = useCallback(() => {
    if (!client) {
      throw new Error("Defang client unavailable");
    }

    client?.destroy({ project }, (err, res) => {
      if (err) {
        console.log("@@ error destroying client", err);
      } else {
        // Hack to force a reload of the page to update the list of projects
        window.location.reload();
      }
    });
  }, [client, project]);

  if (!services?.length && !loading && !search) {
    return <EmptyServices />;
  }

  if (loading) {
    return <PageLoading />;
  }

  const hasExpiry = !!expiresAt;
  const hasExpired = hasExpiry && expiresAt < Date.now();
  const willExpire = hasExpiry && expiresAt > Date.now();

  return (
    <Stack p={2} spacing={2} flexGrow={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h1">Projects</Typography>
        <Box flexGrow={1} mr={2} />
        <TextField
          label="Search"
          size="small"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>
      <Box style={{ minHeight: "calc(100vh - 200px)", width: "100%" }}>
        <Card sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <Typography variant="h2">
              {project ?? "Unnamed Project"}
              <Small>{` free `}</Small>
            </Typography>
            {hasExpired && (
              <Tooltip
                title={
                  <Typography>
                    Redeploy to avoid downtime or{" "}
                    <Link
                      color="#FFF"
                      href="https://docs.defang.io/docs/concepts/defang-byoc"
                    >
                      use BYOC
                    </Link>
                  </Typography>
                }
              >
                <Alert
                  severity="error"
                  icon={<HelpOutlineTwoTone />}
                  sx={{ cursor: "pointer" }}
                >
                  This deployment expired on{" "}
                  {new Date(expiresAt).toDateString()}
                </Alert>
              </Tooltip>
            )}
            {willExpire && (
              <Tooltip
                title={
                  <Typography>
                    Redeploy before this date to avoid downtime or{" "}
                    <Link
                      color="#FFF"
                      href="https://docs.defang.io/docs/concepts/defang-byoc"
                    >
                      use BYOC
                    </Link>
                  </Typography>
                }
              >
                <Alert
                  severity="info"
                  icon={<HelpOutlineTwoTone />}
                  sx={{ cursor: "pointer" }}
                >
                  This deployment will be deactivated on{" "}
                  {new Date(expiresAt).toDateString()}
                </Alert>
              </Tooltip>
            )}
            <DeleteWithConfirmationButton
              dialogTitle={"Are you sure?"}
              dialogContent={`You want to delete this project?\n\n"${project}"`}
              onDelete={handleDelete}
            />
          </Box>
          <DataGrid
            style={{ width: "100%" }}
            pageSizeOptions={[5]}
            columns={[
              {
                field: "status",
                headerName: "Status",
                width: 80,
                renderCell: (params) => (
                  <StatusIcon status={params.value} state={params.row.state} />
                ),
              },
              { field: "name", headerName: "Service", width: 150 },
              {
                field: "fqdn",
                headerName: "Domain Name",
                flex: 1,
                minWidth: 250,
              },
              {
                field: "dockerImage",
                headerName: "Container Image",
                flex: 1,
                minWidth: 250,
              },
              { field: "port", headerName: "Port", flex: 1, minWidth: 150 },
            ]}
            onRowClick={(params) => {
              router.push(`/service/${params.row.name}`);
            }}
            sx={{
              "& .MuiDataGrid-cell": { cursor: "pointer" },
              mb: 2,
            }}
            rows={services || []}
          />
        </Card>
      </Box>
    </Stack>
  );
}

const ProjectsPageOuter = LoginRequired(function ProjectsPage() {
  return (
    <Loader>
      <ProjectsPageInner />
    </Loader>
  );
});

export default ProjectsPageOuter;
