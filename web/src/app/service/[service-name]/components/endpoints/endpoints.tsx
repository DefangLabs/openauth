import {
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useService } from "../../hooks/use-service/use-service";

export function Endpoints() {
  const { service } = useService();
  console.log(service);
  return (service?.endpoints?.length || 0) > 0 ? (
    <Stack spacing={2}>
      <Typography variant="h2">Endpoints</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Port</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          {service?.endpoints.map((endpoint, i) => (
            <TableRow key={endpoint}>
              <TableCell>{service.service?.ports?.[i]?.target}</TableCell>
              <TableCell>
                {endpoint.endsWith(".internal") ||
                endpoint.includes(".internal:") ? (
                  endpoint
                ) : (
                  <a href={`https://${endpoint}`} target="_blank">
                    {endpoint}
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </Stack>
  ) : null;
}
