import { thinGreyBorder } from "@/modules/mui/constants";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useService } from "../../hooks/use-service/use-service";

export function Endpoints() {
  const { service } = useService();
  return (service?.endpoints?.length || 0) > 0 ? (
    <Stack spacing={2}>
      <Typography variant="h2">Endpoints</Typography>
      <TableContainer
        component={({ children }: { children: ReactNode }) => (
          <Paper elevation={0} sx={thinGreyBorder}>
            {children}
          </Paper>
        )}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Port</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  ) : null;
}
