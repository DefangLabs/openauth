"use client";

import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFilteredServices } from "./hooks/use-filtered-services/use-filtered-services";
import { useSearch } from "./hooks/use-search/use-search";
import { useRouter } from "next/navigation";

export default LoginRequired(function ServicesPage() {
  const services = useFilteredServices();
  const { search, setSearch } = useSearch();
  const router = useRouter();
  return (
    <Stack p={2} spacing={2} flexGrow={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h1">Services</Typography>
        <Box flexGrow={1} />
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>
      <DataGrid
        style={{ minHeight: "calc(100vh - 200px)" }}
        columns={[
          { field: "name", headerName: "Name", flex: 1 },
          { field: "fqdn", headerName: "Public URL", flex: 1 },
          { field: "privateDomain", headerName: "Private URL", flex: 1 },
          { field: "dockerImage", headerName: "Image", flex: 1 },
          { field: "port", headerName: "Port", flex: 1 },
          { field: "latencyMs", headerName: "Latency", flex: 1 },
        ]}
        onRowClick={(params) => {
          router.push(`/service/details?id=${params.row.id}`);
        }}
        sx={{
          "& .MuiDataGrid-cell": { cursor: "pointer" },
        }}
        rows={services}
      />
    </Stack>
  );
}) as any;
