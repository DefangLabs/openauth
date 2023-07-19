"use client";

import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";
import {
  Box,
  Icon,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFilteredServices } from "./hooks/use-filtered-services/use-filtered-services";
import { useSearch } from "./hooks/use-search/use-search";
import { useRouter } from "next/navigation";
import Circle from "@mui/icons-material/Circle";

export default LoginRequired(function ServicesPage() {
  const services = useFilteredServices();
  const { search, setSearch } = useSearch();
  const router = useRouter();
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
              renderCell: (params) => (
                <Tooltip title={params.value}>
                  <Icon
                    style={{
                      color:
                        params.value === "SERVICE_STEADY_STATE"
                          ? "green"
                          : "red",
                    }}
                  >
                    <Circle />
                  </Icon>
                </Tooltip>
              ),
            },
            { field: "name", headerName: "Name", width: 150 },
            { field: "fqdn", headerName: "Public URL", flex: 1, minWidth: 250 },
            // { field: "privateDomain", headerName: "Private URL", flex: 1 },
            {
              field: "dockerImage",
              headerName: "Image",
              flex: 1,
              minWidth: 250,
            },
            { field: "port", headerName: "Port", flex: 1, minWidth: 150 },
            // { field: "latencyMs", headerName: "Latency", flex: 1 },
          ]}
          onRowClick={(params) => {
            router.push(`/service/${params.row.name}`);
          }}
          sx={{
            "& .MuiDataGrid-cell": { cursor: "pointer" },
          }}
          rows={services}
        />
      </Box>
    </Stack>
  );
}) as any;
