"use client";

import { useSignTos } from "@/modules/defang/hooks/use-sign-tos/use-sign-tos";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const params = useSearchParams();
  const { data: signed } = useSignTos();
  const url = params.get("url");
  useEffect(() => {
    if (signed && typeof window !== "undefined" && url) {
      // redirect
      window.location.href = url;
    }
  }, [signed, url]);
  return null;
}
