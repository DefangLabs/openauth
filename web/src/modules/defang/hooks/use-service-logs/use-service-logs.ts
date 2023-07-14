import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { strip } from "ansicolor";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLogsFilter } from "../../../../app/service/[service-name]/hooks/use-logs-filter/use-logs-filter";
import { useServiceName } from "../../../../app/service/[service-name]/hooks/use-service-name/use-service-name";
import { LogEntry, TailResponse } from "../../generated/fabric_pb";

export function useServiceLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const client = useDefangClient();
  const name = useServiceName();
  const { filter, negativeFilter } = useLogsFilter();
  const deferredFilter = useDeferredValue(filter);

  const callback = useCallback((res: TailResponse) => {
    setLogs((logs) => [
      ...res.entries.map((entry) => entry),
      ...logs.slice(0, 400),
    ]);
  }, []);

  useEffect(() => {
    if (!client || !name) return;

    (window as any).client = client;

    const stopTail = client.tail({ service: `${name}.` }, callback, () => {});

    return () => {
      try {
        stopTail();
      } catch (e) {
        console.log("@@ error stopping tail", e);
      }
    };
  }, [callback, client, name]);

  return useMemo(() => {
    return logs.filter((log) => {
      if (!deferredFilter) {
        return true;
      }
      const logText = strip(log.message);
      return negativeFilter
        ? !logText.includes(deferredFilter)
        : logText.includes(deferredFilter);
    });
  }, [deferredFilter, logs, negativeFilter]);
}
