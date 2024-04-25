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
  TableBody,
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

export function Secrets() {
  const { service } = useService();
  return (service?.service?.secrets || []).length > 0 ? (
    <Stack spacing={2}>
      <Typography variant="h2">Secrets</Typography>
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
              <TableCell width={250}>Secret</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(service?.service?.secrets || []).map(({ source }, i) => (
              <TableRow key={source}>
                <TableCell width={250}>{source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  ) : null;
}
