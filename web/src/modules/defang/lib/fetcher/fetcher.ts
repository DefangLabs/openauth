import { FN_BASE } from "@/lib/constants";

export const fetcher = async (url: string) => {
  const res = await fetch(`${FN_BASE}/${url}`);
  const data = await res.json();
  return data;
};
