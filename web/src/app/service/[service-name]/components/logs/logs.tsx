import { COLORS } from "@/modules/mui/constants";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useServiceLogs } from "../../../../../modules/defang/hooks/use-service-logs/use-service-logs";
import { useLogsFilter } from "../../hooks/use-logs-filter/use-logs-filter";
import { parse } from "ansicolor";

const LogContainer = styled("div")`
  font-family: "Courier New", Courier, monospace;
  background-color: #111;
  color: ${COLORS.secondary};
  overflow-x: scroll;
  max-height: 50vh;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(2).toString()};

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 800px;
    max-width: calc(100vw - 400px);
  }
`;

export function Logs() {
  const logs = useServiceLogs();
  const { filter, setFilter, negativeFilter, setNegativeFilter } =
    useLogsFilter();

  return (
    <Stack spacing={2}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h2">Logs</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Filter"
              variant="outlined"
              value={filter}
              size="small"
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={negativeFilter}
                  onChange={(e) => {
                    return setNegativeFilter(!!e.target.checked);
                  }}
                />
              }
              label="Negative Filter"
            />
            <Select>
              <ListItem value="service">Service Logs</ListItem>
              <ListItem value="ci">CI Logs</ListItem>
            </Select>
          </Stack>
        </Grid>
      </Grid>
      <LogContainer>
        {logs.map((log) => (
          <div
            key={`${log.timestamp?.toJsonString()} ${log.message.slice(0, 20)}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {parse(log.message).spans.map((span, i) => (
              <span
                key={i}
                dangerouslySetInnerHTML={{
                  __html: `<span style="${span.css}">${span.text}</span>`,
                }}
              />
            ))}
          </div>
        ))}
      </LogContainer>
    </Stack>
  );
}
