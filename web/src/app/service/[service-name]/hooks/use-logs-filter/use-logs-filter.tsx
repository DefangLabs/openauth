import { atom, useAtom } from "jotai";

export const logsFilterAtom = atom<string>("");
export const negativeFilterAtom = atom<boolean>(false);

export function useLogsFilter() {
  const [filter, setFilter] = useAtom(logsFilterAtom);
  const [negativeFilter, setNegativeFilter] = useAtom(negativeFilterAtom);
  return {
    filter,
    setFilter,
    negativeFilter,
    setNegativeFilter,
  };
}
