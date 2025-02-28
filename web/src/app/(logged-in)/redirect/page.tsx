"use client";

import { Loader } from "@/components/loader/loader";
import { useSignTos } from "@/modules/defang/hooks/use-sign-tos/use-sign-tos";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function RedirectPageInner() {
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

const ProjectsPageOuter = function RedirectPage() {
  return (
    <Loader>
      <RedirectPageInner />
    </Loader>
  );
};

export default ProjectsPageOuter;
