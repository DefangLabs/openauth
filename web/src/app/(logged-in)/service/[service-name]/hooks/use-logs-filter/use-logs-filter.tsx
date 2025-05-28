import { atom, useAtom } from "jotai";

export type LogType = "all" | "current" | "image";
export type LogTime = "0" | "1" | "30" | "60" | "720";

export const logsFilterAtom = atom<string>("");
export const negativeFilterAtom = atom<boolean>(false);
export const logTypeFilterAtom = atom<LogType>("current");
export const logTimeFilterAtom = atom<LogTime>("30");

export function useLogsFilter() {
  const [filter, setFilter] = useAtom(logsFilterAtom);
  const [negativeFilter, setNegativeFilter] = useAtom(negativeFilterAtom);
  const [logType, setLogType] = useAtom(logTypeFilterAtom);
  const [logTime, setLogTime] = useAtom(logTimeFilterAtom);

  return {
    filter,
    setFilter,
    negativeFilter,
    setNegativeFilter,
    logType,
    setLogType,
    logTime,
    setLogTime,
  };
}
