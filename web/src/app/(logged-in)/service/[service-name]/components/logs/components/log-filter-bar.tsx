import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  LogTime,
  LogType,
  useLogsFilter,
} from "../../../hooks/use-logs-filter/use-logs-filter";
import { useService } from "../../../hooks/use-service/use-service";

let filterTimeout: NodeJS.Timeout;
const trackFilter = () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    analytics.track(EVENTS.filterLogs);
  }, 500);
};

export function LogFilterBar() {
  const {
    filter,
    setFilter,
    negativeFilter,
    setNegativeFilter,
    logType,
    setLogType,
    logTime,
    setLogTime,
  } = useLogsFilter();
  const { service } = useService({ skip: true, poll: undefined });

  return (
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
            setLogType(e.target.value as LogType);
          }}
          size="small"
        >
          <MenuItem value="current">Current Deployment</MenuItem>
          <MenuItem value="all">All Deployments</MenuItem>
          <MenuItem disabled={!service?.service.build} value="image">
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
  );
}
