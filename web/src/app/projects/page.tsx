"use client";

import { Loader } from "@/components/loader/loader";
import { StatusIcon } from "@/components/status-icon/status-icon";
import { analytics } from "@/modules/analytics/lib/analytics";
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { EmptyServices } from "./components/empty-services/empty-services";
import { useFilteredServices } from "./hooks/use-filtered-services/use-filtered-services";
import { useSearch } from "./hooks/use-search/use-search";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { CopyCode } from "@/components/copy-code/copy-code";

function ProjectsPageInner() {
  const { services, loading } = useFilteredServices();
  const { search, setSearch } = useSearch();
  const router = useRouter();

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

  const projectName = services?.[0]?.project ?? "Unnamed Project";

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
          <Typography variant="h2" sx={{ mb: 2 }}>
            {projectName}
          </Typography>
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
              { field: "name", headerName: "Name", width: 150 },
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
          <Box sx={{ borderLeft: "4px solid orange", pl: 2 }}>
            <Typography variant="h3" sx={{ color: "orange", mb: 2 }}>
              Deleting this Project
            </Typography>
            <CopyCode
              code={`defang down --project-name ${projectName}`}
              TextFieldProps={{
                helperText:
                  "Run this command from the command line to delete this project.",
                fullWidth: true,
                variant: "outlined",
                value: `defang down --project-name ${projectName}`,
                InputProps: {
                  readOnly: true,
                  inputProps: {
                    style: { cursor: "pointer" },
                  },
                },
                onClick: () => {
                  analytics.track("Portal: Copied down command", {});
                },
              }}
            />
          </Box>
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
