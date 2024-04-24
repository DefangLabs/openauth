import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import { COLORS } from "@/modules/mui/constants";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
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
  border-radius: ${({ theme }) => theme.shape.borderRadius.toString()}px;
  padding: ${({ theme }) => theme.spacing(2).toString()};

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 800px;
    max-width: calc(100vw - 400px);
  }
`;

type LogFilter = "all" | "current" | "image";
type LogTime = "0" | "1" | "30" | "60" | "720";

let filterTimeout: NodeJS.Timeout;
const trackFilter = () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    analytics.track(EVENTS.filterLogs);
  }, 500);
};

export function Logs() {
  const [logContainer, setLogContainer] = useState<HTMLDivElement | null>(null);
  const [logType, setLogType] = useState<LogFilter>("all");
  const [logTime, setLogTime] = useState<LogTime>("30");
  const { filter, setFilter, negativeFilter, setNegativeFilter } =
    useLogsFilter();
  const { service, loading } = useService({ skip: true, poll: undefined });
  const { resetLogs } = useServiceLogs({
    service: service?.service?.name?.concat(logType == "image" ? "-image" : ""),
    etag: logType === "all" ? undefined : service?.etag,
    sinceMins: parseInt(logTime),
    logContainer: logContainer,
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
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    trackFilter();
                  }
                  return setFilter(e.target.value);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={negativeFilter}
                    onChange={(e) => {
                      analytics.track(EVENTS.toggleNegativeFilter, {
                        value: !!e.target.checked,
                      });
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
                    analytics.track(EVENTS.toggleLogType, {
                      type: e.target.value,
                    });
                    resetLogs();
                    setLogType(e.target.value as LogFilter);
                  }}
                  size="small"
                >
                  <MenuItem value="all">All Deployments</MenuItem>
                  <MenuItem value="current">Current Deployment</MenuItem>
                  <MenuItem
                    disabled={!service?.service.build?.context}
                    value="image"
                  >
                    Current Image Build
                  </MenuItem>
                </Select>
              </FormControl>
              <ToggleButtonGroup
                value={logTime}
                exclusive
                size="small"
                onChange={(e, v) => {
                  analytics.track(EVENTS.toggleLogTime, {
                    time: v,
                  });
                  resetLogs();
                  setLogTime(v as LogTime);
                }}
              >
                <ToggleButton value="0">clear</ToggleButton>
                <ToggleButton value="1">1m</ToggleButton>
                <ToggleButton value="30">30m</ToggleButton>
                <ToggleButton value="60">1h</ToggleButton>
                <ToggleButton value="720">12h</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Grid>
        </Grid>
        <LogContainer
          ref={(ref) => {
            setLogContainer(ref);
          }}
        />
      </Stack>
    </>
  );
}
