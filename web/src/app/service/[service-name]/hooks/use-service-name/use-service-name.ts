import { useParams, useSearchParams } from "next/navigation";

export function useServiceName() {
  const searchParams = useSearchParams();
  const params = useParams();
  const id =
    params["service-name"] || searchParams.get("service-name") || undefined;
  return id;
}
