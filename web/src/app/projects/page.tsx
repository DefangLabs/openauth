"use client";

import { Loader } from "@/components/loader/loader";
import { StatusIcon } from "@/components/status-icon/status-icon";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { COLORS } from "@/modules/mui/constants";
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import DeleteWithConfirmationButton from "../../components/delete-with-confirmation-button";
import { EmptyServices } from "./components/empty-services/empty-services";
import { useFilteredServices } from "./hooks/use-filtered-services/use-filtered-services";
import { useSearch } from "./hooks/use-search/use-search";

const Small = styled("small")`
  color: ${COLORS.darkGrey};
`;

function ProjectsPageInner() {
  const { services, loading } = useFilteredServices();
  const { search, setSearch } = useSearch();
  const router = useRouter();
  const client = useDefangClient();
  const project = services?.[0]?.project ?? "Unnamed Project";

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
    return (
      <Stack
        height="100vh"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress />
        <Typography variant="h2">Loading...</Typography>
      </Stack>
    );
  }

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
              width: "100%",
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>
              {project}
              <Small>{` free `}</Small>
            </Typography>
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
                renderCell: (params) => <StatusIcon status={params.value} />,
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
