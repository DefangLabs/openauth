import { useServices } from "@/modules/defang/hooks/use-services/use-services";
import { atom } from "jotai";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const serviceAtom = atom<
  NonNullable<ReturnType<typeof useServices>["services"]>[number] | undefined
>(undefined);

export function useService({
  skip,
  poll,
}: NonNullable<Parameters<typeof useServices>[0]> = {}) {
  const { services, loading } = useServices({ skip, poll });
  const searchParams = useSearchParams();
  const params = useParams();
  const name =
    params["service-name"] || searchParams.get("service-name") || undefined;

  return {
    loading,
    service: useMemo(
      () => services?.find((service) => service.service?.name === name) || null,
      [name, services],
    ),
  };
}
