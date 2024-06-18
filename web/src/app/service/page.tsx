"use client";

import { Loader } from "@/components/loader/loader";
import { StatusIcon } from "@/components/status-icon/status-icon";
import {
  Box,
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

function ServicesPageInner() {
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

  return (
    <Stack p={2} spacing={2} flexGrow={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h1">Services</Typography>
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
        <DataGrid
          style={{ minHeight: "calc(100vh - 200px)", width: "100%" }}
          columns={[
            {
              field: "status",
              headerName: "Status",
              width: 80,
              renderCell: (params) => <StatusIcon status={params.value} />,
            },
            { field: "project", headerName: "Project", width: 150 },
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
          }}
          rows={services || []}
        />
      </Box>
    </Stack>
  );
}

const ServicePageOuter = LoginRequired(function ServicesPage() {
  return (
    <Loader>
      <ServicesPageInner />
    </Loader>
  );
});

export default ServicePageOuter;
