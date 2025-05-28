import useResizeObserver from "@/hooks/use-resize-observer/use-resize-observer";
import { thinGreyBorder } from "@/modules/mui/constants";
import { Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { parse } from "ansicolor";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { FixedSizeList, ListOnScrollProps } from "react-window";
import styleToObject from "style-to-object";
import { useLogsFilter } from "../../hooks/use-logs-filter/use-logs-filter";
import { useServiceLogs } from "../../hooks/use-service-logs/use-service-logs";
import { useService } from "../../hooks/use-service/use-service";
import { LogFilterBar } from "./components/log-filter-bar";

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

const HiddenMeasure = styled("div")`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
`;

interface Log {
  timestamp?: {
    toDate: () => Date;
  };
  message: string;
}

interface LogEntryProps {
  index: number;
  style: CSSProperties;
  data: Log[];
}

function LogEntry({ index, style, data }: LogEntryProps) {
  const log = data[index];
  const date = log.timestamp?.toDate() || new Date();
  const offset = -date.getTimezoneOffset();
  const offsetSign = offset >= 0 ? "+" : "-";
  const offsetHours = Math.floor(Math.abs(offset / 60))
    .toString()
    .padStart(2, "0");
  const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
  const localISOTime = new Date(date.getTime() + offset * 60000)
    .toISOString()
    .slice(0, -1);
  const timestamp = `[${localISOTime}${offsetSign}${offsetHours}:${offsetMinutes}] `;

  const parsedMessage = parse(log.message);

  return (
    <div style={{ ...style, whiteSpace: "pre" }}>
      <span style={{ color: "#8bc34a" }}>{timestamp}</span>
      {parsedMessage.spans.map((span, i) => {
        return (
          <span key={i} style={styleToObject(span.css) || undefined}>
            {span.text}
          </span>
        );
      })}
    </div>
  );
}

export function Logs() {
  const { ref: sizeRef, size } = useResizeObserver();
  const { service } = useService({ skip: true, poll: undefined });
  const { logType, logTime } = useLogsFilter();
  const { logs } = useServiceLogs({
    etag: logType === "all" ? undefined : service?.etag,
    logType,
    service: service?.service?.name,
    sinceMins: parseInt(logTime),
  });

  const [maxWidth, setMaxWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<FixedSizeList>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (logs.length > 0) {
      if (isInitialLoad) {
        // This is the initial load of logs
        setIsInitialLoad(false);
        setShouldAutoScroll(true);
      }

      if (shouldAutoScroll && listRef.current) {
        listRef.current.scrollToItem(logs.length - 1, "end");
      }
    }
  }, [logs, shouldAutoScroll, isInitialLoad]);

  const handleScroll = ({
    scrollOffset,
    scrollUpdateWasRequested,
  }: ListOnScrollProps) => {
    if (!scrollUpdateWasRequested) {
      const isAtBottom =
        scrollOffset >= logs.length * 18.5 - (size?.height || 0);
      setShouldAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    const measureWidth = () => {
      let tmpMaxWidth = size.width || 0;
      logs.forEach((log) => {
        if (measureRef.current) {
          const timestampExample = "[2024-07-18T15:23:39.797-07:00]";
          const textContent = parse(log.message)
            .spans.map((span) => span.text)
            .join("");
          measureRef.current.textContent = `${timestampExample} ${textContent}`;
          const width = measureRef.current.offsetWidth;
          if (width > tmpMaxWidth && width > size.width) {
            tmpMaxWidth = width;
          }
        }
      });
      setMaxWidth(tmpMaxWidth);
    };

    measureWidth();
  }, [logs, size.width]);

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
          <LogFilterBar />
          <LogContainer
            ref={(ref) => {
              sizeRef.current = ref as any;
            }}
          >
            <HiddenMeasure ref={measureRef} />
            <FixedSizeList
              ref={listRef}
              height={size?.height || 0}
              width={maxWidth + 100}
              itemSize={18.5}
              itemCount={logs.length || 0}
              itemData={logs}
              onScroll={handleScroll}
              initialScrollOffset={logs.length * 18.5 - (size?.height || 0)}
            >
              {LogEntry}
            </FixedSizeList>
          </LogContainer>
        </Stack>
      </Paper>
    </Stack>
  );
}
