import {
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useService } from "../../hooks/use-service/use-service";
import { ReactNode, useState } from "react";
import { thinGreyBorder } from "@/modules/mui/constants";

function Hideable({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(true);
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <span>{hidden ? "***********" : children}</span>
      <IconButton onClick={() => setHidden((prev) => !prev)}>
        {hidden ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Stack>
  );
}

export function Environment() {
  const { service } = useService();
  return Object.keys(service?.service?.environment || {}).length > 1 ? (
    <Stack spacing={2}>
      <Typography variant="h2">Environment</Typography>
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
              <TableCell width={250}>Variable</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          {Object.entries(service?.service?.environment || {}).map(
            ([key, value], i) => (
              <TableRow key={key}>
                <TableCell width={250}>{key}</TableCell>
                <TableCell>
                  <Hideable>{value}</Hideable>
                </TableCell>
              </TableRow>
            )
          )}
        </Table>
      </TableContainer>
    </Stack>
  ) : null;
}
