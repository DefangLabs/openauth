import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useSetUriFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  return useCallback(
    (id: string) => {
      const flow = searchParams.get("flow") || "";

      if (flow !== id) {
        router.replace(`${path}?flow=${id}`);
      }
    },
    [path, router, searchParams],
  );
}
