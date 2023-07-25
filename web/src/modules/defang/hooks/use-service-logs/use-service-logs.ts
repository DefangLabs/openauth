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
  filter?: string;
  negativeFilter?: boolean;
  service?: string;
  etag?: string;
}

export function useServiceLogs(opts: UseServiceLogsOpts) {
  const { filter = "", negativeFilter = false } = opts;
  const service = opts?.service;
  const etag = opts?.etag;
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const client = useDefangClient();
  const deferredFilter = useDeferredValue(filter).toLocaleLowerCase();
  const deferredLogs = useDeferredValue(logs);

  const resetLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const callback = useCallback((res: TailResponse) => {
    setLogs((logs) =>
      [...res.entries.map((entry) => entry), ...logs].slice(0, 100)
    );
  }, []);

  useEffect(() => {
    if (!client || (!service && !etag)) return;

    const stopTail = client.tail(
      {
        service,
        etag,
        since: { seconds: BigInt(Math.floor(Date.now() / 1000) - 60 * 30) },
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
  }, [callback, client, etag, service]);

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
