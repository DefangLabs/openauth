import { FN_BASE } from "@/lib/constants";
import useSWR from "swr";
import { Services } from "@/modules/defang/fabric/v1/fabric_pb";

const fetcher = async (url: string) => {
  const res = await fetch(`${FN_BASE}/${url}`);
  const data = await res.json();
  return data;
};

export function useServicesRequest() {
  return useSWR<Services.AsObject>("/services", fetcher);
}
