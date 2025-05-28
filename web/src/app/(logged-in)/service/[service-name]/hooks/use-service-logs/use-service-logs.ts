import { LogEntry, TailResponse } from "@/modules/defang/generated/fabric_pb";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LogType, useLogsFilter } from "../use-logs-filter/use-logs-filter";

interface UseServiceLogsOpts {
  etag?: string;
  logType?: LogType;
  service?: string;
  sinceMins?: number;
}

export function useServiceLogs(opts: UseServiceLogsOpts) {
  const etag = opts?.etag;
  const logType = opts?.logType ?? "all";
  const service = opts?.service;
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
  }, [resetLogs, service, etag, sinceMins, logType]);

  const messageCallback = useCallback((res: TailResponse) => {
    setLogs((prevLogs) => {
      return [...prevLogs, ...res.entries];
    });
  }, []);

  useEffect(() => {
    if (!client || (!service && !etag)) return;

    const cancelTail = client.tail(
      {
        services: service ? getServicesFilter(logType, service) : undefined,
        etag,
        since: sinceMins
          ? { seconds: BigInt(Math.floor(Date.now() / 1000) - 60 * sinceMins) }
          : undefined,
      },
      messageCallback,
      (err) => {
        console.error("@@ tail stopped", err);
      },
    );

    return () => {
      try {
        cancelTail();
      } catch (e) {
        console.error("@@ error stopping tail", e);
      }
    };
  }, [messageCallback, client, etag, service, sinceMins, logType]);

  return {
    logs: filteredLogs,
  };
}

function getServicesFilter(
  logType: LogType,
  service: string,
): string[] | undefined {
  switch (logType) {
    case "all":
      return undefined;
    case "image":
      return [service + "-image"];
    case "current":
      return [service, service + "-image"];
  }
}
