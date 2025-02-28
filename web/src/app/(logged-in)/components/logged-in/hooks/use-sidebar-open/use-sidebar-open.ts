import { atom, useAtom } from "jotai";

const sidebarOpenAtom = atom(false);

export function useSidebarOpen() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  return {
    sidebarOpen,
    setSidebarOpen,
  };
}
