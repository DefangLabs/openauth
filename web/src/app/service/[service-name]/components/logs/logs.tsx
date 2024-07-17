import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import { COLORS, thinGreyBorder } from "@/modules/mui/constants";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useServiceLogs } from "../../hooks/use-service-logs/use-service-logs";
import { useLogsFilter } from "../../hooks/use-logs-filter/use-logs-filter";
import { useService } from "../../hooks/use-service/use-service";

const LogContainer = styled("div")`
  font-family: "Courier New", Courier, monospace;
  overflow-x: scroll;
  height: 50vh;
  padding-left: ${({ theme }) => theme.spacing(2).toString()};
  padding-right: ${({ theme }) => theme.spacing(2).toString()};
  flex-grow: 1;

  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: calc(100vw - 416px);
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
  const { service } = useService({ skip: true, poll: undefined });
  const serviceName = service?.service?.name?.concat(
    logType == "image" ? "-image" : ""
  );
  const { resetLogs, filterLogs } = useServiceLogs({
    service: serviceName,
    etag: logType === "all" ? undefined : service?.etag,
    sinceMins: parseInt(logTime),
    logContainer: logContainer,
  });

  if (service?.service.redis !== undefined) {
    return (
      <Stack spacing={2}>
        <Typography variant="h2">Logs</Typography>
        <Typography>No logs for managed Redis yet.</Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h2">Logs</Typography>
      <Paper elevation={0} sx={thinGreyBorder}>
        <Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ borderBottom: "1px solid #ccc" }}
            p={1}
          >
            <TextField
              label="Filter"
              variant="outlined"
              value={filter}
              size="small"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  trackFilter();
                }
                setFilter(e.target.value);
                filterLogs();
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
              <ToggleButton value="5">5m</ToggleButton>
              <ToggleButton value="30">30m</ToggleButton>
              <ToggleButton value="60">1h</ToggleButton>
              <ToggleButton value="720">12h</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <LogContainer
            ref={(ref) => {
              setLogContainer(ref);
            }}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
