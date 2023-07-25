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
  const deferredFilter = useDeferredValue(filter).toLocaleLowerCase();
  const deferredLogs = useDeferredValue(logs);

  const callback = useCallback((res: TailResponse) => {
    setLogs((logs) =>
      [...res.entries.map((entry) => entry), ...logs].slice(0, 100)
    );
  }, []);

  useEffect(() => {
    if (!client || !name) return;

    const stopTail = client.tail(
      { service: `${name}`, since: { seconds: BigInt(60 * 20) } },
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
  }, [callback, client, name]);

  return useMemo(() => {
    if (!deferredFilter) {
      return deferredLogs;
    }
    return deferredLogs.filter((log) => {
      const logText = strip(log.message).toLocaleLowerCase();
      return negativeFilter
        ? !logText.includes(deferredFilter)
        : logText.includes(deferredFilter);
    });
  }, [deferredFilter, deferredLogs, negativeFilter]);
}
