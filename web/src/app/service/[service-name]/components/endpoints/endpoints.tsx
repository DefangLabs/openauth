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
  return (service?.endpoints?.length || 0) > 1 ? (
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
                <a href={`https://${endpoint}`}>{endpoint}</a>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </Stack>
  ) : null;
}
