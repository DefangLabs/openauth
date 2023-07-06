import { FN_BASE } from "@/lib/constants";
import useSWR from "swr";
import { Services } from "@/modules/defang/fabric/v1/fabric_pb";

const fetcher = async ([url, id]: [string, string]) => {
  const res = await fetch(`${FN_BASE}/${url}/${id}`);
  const data = await res.json();
  return data;
};

export function useServiceRequest(id?: string) {
  return useSWR<Services.AsObject["servicesList"][0]>(
    id ? ["/services", id] : undefined,
    fetcher
  );
}
