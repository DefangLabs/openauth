import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { strip } from "ansicolor";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LogEntry, TailResponse } from "../../generated/fabric_pb";

interface UseServiceLogsOpts {
  etag?: string;
  filter?: string;
  negativeFilter?: boolean;
  service?: string;
  sinceMins?: number;
}

export function useServiceLogs(opts: UseServiceLogsOpts) {
  const { filter = "", negativeFilter = false } = opts;
  const service = opts?.service;
  const etag = opts?.etag;
  const sinceMins = opts?.sinceMins;
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const client = useDefangClient();
  const deferredFilter = useDeferredValue(filter).toLocaleLowerCase();
  const deferredLogs = useDeferredValue(logs);

  const resetLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const callback = useCallback((res: TailResponse) => {
    setLogs(
      (logs) =>
        res.host === "fabric" ? logs : [...res.entries, ...logs].slice(0, 100) // ignore status messages
    );
  }, []);

  useEffect(() => {
    if (!client || (!service && !etag)) return;

    const stopTail = client.tail(
      {
        service,
        etag,
        since: sinceMins
          ? { seconds: BigInt(Math.floor(Date.now() / 1000) - 60 * sinceMins) }
          : undefined,
      },
      callback,
      () => {}
    );

    return () => {
      try {
        stopTail();
      } catch (e) {
        console.log("@@ error stopping tail", e);
      }
    };
  }, [callback, client, etag, service, sinceMins]);

  return {
    logs: useMemo(() => {
      if (!deferredFilter) {
        return deferredLogs;
      }
      return deferredLogs.filter((log) => {
        const logText = strip(log.message).toLocaleLowerCase();
        return negativeFilter
          ? !logText.includes(deferredFilter)
          : logText.includes(deferredFilter);
      });
    }, [deferredFilter, deferredLogs, negativeFilter]),
    resetLogs,
  };
}
