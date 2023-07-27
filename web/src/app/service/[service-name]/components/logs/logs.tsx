import { COLORS } from "@/modules/mui/constants";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { parse } from "ansicolor";
import { useState } from "react";
import { useServiceLogs } from "../../../../../modules/defang/hooks/use-service-logs/use-service-logs";
import { useLogsFilter } from "../../hooks/use-logs-filter/use-logs-filter";
import { useService } from "../../hooks/use-service/use-service";

const LogContainer = styled("div")`
  font-family: "Courier New", Courier, monospace;
  background-color: #111;
  color: ${COLORS.secondary};
  overflow-x: scroll;
  height: 50vh;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(2).toString()};

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 800px;
    max-width: calc(100vw - 400px);
  }
`;

type LogFilter = "all" | "current";

export function Logs() {
  const [logType, setLogType] = useState<LogFilter>("all");
  const { filter, setFilter, negativeFilter, setNegativeFilter } =
    useLogsFilter();
  const { service, loading } = useService({ skip: true, poll: undefined });
  const { logs, resetLogs } = useServiceLogs({
    filter,
    negativeFilter,
    service: service?.service?.name,
    etag: logType === "current" ? service?.etag : undefined,
  });

  return (
    <>
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
              <FormControl>
                <InputLabel id="log-type-select-label">Logs for</InputLabel>
                <Select
                  labelId="log-type-select-label"
                  id="log-type-select"
                  value={logType}
                  label="Logs for"
                  onChange={(e) => {
                    resetLogs();
                    setLogType(e.target.value as LogFilter);
                  }}
                  size="small"
                >
                  <MenuItem value="all">All Deployments</MenuItem>
                  <MenuItem value="current">Current Deployment</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
        <LogContainer>
          {logs.map((log) => (
            <div
              key={`${log.timestamp?.toJsonString()} ${log.message.slice(
                0,
                20
              )}`}
              style={{ whiteSpace: "pre" }}
            >
              {parse(log.message).spans.map((span, i) => (
                <span key={i} style={parseCss(span.css)}>
                  {span.text}
                </span>
              ))}
            </div>
          ))}
        </LogContainer>
      </Stack>
    </>
  );
}

function parseCss(css: string): React.CSSProperties {
  const styles = css.split(";").map((style) => {
    const [key, value] = style.split(":", 2);
    return [key.trim().replace(/-[a-z]/g, (m) => m[1].toUpperCase()), value];
  });
  return Object.fromEntries(styles) as React.CSSProperties;
}
