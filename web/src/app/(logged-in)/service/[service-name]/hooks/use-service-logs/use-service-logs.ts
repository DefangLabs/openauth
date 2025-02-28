import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
// import {
//   LogEntry,
//   TailResponse,
// } from "../../../../../modules/defang/generated/fabric_pb";
import { useLogsFilter } from "../use-logs-filter/use-logs-filter";
import { LogEntry, TailResponse } from "@/modules/defang/generated/fabric_pb";

interface UseServiceLogsOpts {
  etag?: string;
  service?: string;
  sinceMins?: number;
}

export function useServiceLogs(opts: UseServiceLogsOpts) {
  const service = opts?.service;
  const etag = opts?.etag;
  const sinceMins = opts?.sinceMins;
  const client = useDefangClient();
  const { filter, negativeFilter } = useLogsFilter();
  const deferredFilter = useDeferredValue(filter);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const text = log.message.toLocaleLowerCase();
      const lcFilter = deferredFilter?.toLocaleLowerCase();
      if (!text) return false;
      if (!negativeFilter && lcFilter && !text.includes(lcFilter)) return false;
      if (!!negativeFilter && lcFilter && text.includes(lcFilter)) return false;
      return true;
    });
  }, [logs, deferredFilter, negativeFilter]);

  const resetLogs = useCallback(() => {
    setLogs([]);
  }, []);

  useEffect(() => {
    resetLogs();
  }, [resetLogs, service, etag, sinceMins]);

  const callback = useCallback((res: TailResponse) => {
    setLogs((prevLogs) => {
      return [...prevLogs, ...res.entries];
    });
  }, []);

  useEffect(() => {
    if (!client || (!service && !etag)) return;

    const stopTail = client.tail(
      {
        services: service ? [service] : undefined,
        etag,
        since: sinceMins
          ? { seconds: BigInt(Math.floor(Date.now() / 1000) - 60 * sinceMins) }
          : undefined,
      },
      callback,
      () => {},
    );

    return () => {
      try {
        stopTail();
      } catch (e) {
        console.error("@@ error stopping tail", e);
      }
    };
  }, [callback, client, etag, service, sinceMins]);

  return {
    logs: filteredLogs,
  };
}
