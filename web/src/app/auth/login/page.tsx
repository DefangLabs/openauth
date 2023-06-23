"use client";

import { useSetUriFlow } from "@/modules/kratos/hooks/use-set-uri-flow/use-set-uri-flow";
import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";
import { Grid } from "@mui/material";
import { GenericError, LoginFlow } from "@ory/client";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Main } from "./components/main/main";
import { SideBar } from "./components/sidebar/sidebar";
import { GRADIENTS } from "@/modules/mui/constants";

export default function LoginPage() {
  const [flow, setFlow] = useState<LoginFlow>();
  const router = useRouter();
  const search = useSearchParams();
  const setUriFlow = useSetUriFlow();

  const flowId = search.get("flow") || "";
  const returnTo = search.get("return_to") || "";
  const refresh = Boolean(search.get("refresh"));
  const aal = String(search.get("aal") || "");

  const getFlow = useCallback(
    (id: string) =>
      // If ?flow=.. was in the URL, we fetch it
      kratosClient
        .getLoginFlow({ id })
        .then(({ data }) => setFlow(data))
        .catch((error) => {
          const data = error.response?.data as { error: GenericError };
          const errorId = data?.error?.id;
          switch (errorId) {
            case "self_service_flow_expired":
              router.push("/auth/login");
              break;
          }
        }),
    [router]
  );

  const createFlow = useCallback(
    (refresh: boolean, aal: string, returnTo: string) =>
      kratosClient
        .createBrowserLoginFlow({
          refresh: refresh,
          aal: aal,
          returnTo: returnTo,
        })
        .then(({ data }) => {
          setFlow(data);
          setUriFlow(data.id);
        })
        .catch((error: AxiosError) => {
          const data = error.response?.data as { error: GenericError };
          const errorId = data?.error?.id;
          switch (errorId) {
            case "session_already_available":
              router.push("/auth");
              break;
          }
        }),
    [router, setUriFlow]
  );

  useEffect(() => {
    if (flowId) {
      getFlow(flowId).catch(() => {
        createFlow(refresh, aal, returnTo);
      });
      return;
    }

    // Otherwise we initialize it
    createFlow(refresh, aal, returnTo);
  }, [aal, createFlow, flowId, getFlow, refresh, returnTo]);

  const login = useCallback(
    () =>
      kratosClient
        .updateLoginFlow({
          flow: String(flow?.id),
          updateLoginFlowBody: {
            method: "oidc",
            provider: "github",
          },
        })
        .catch((e) => {
          const data = e.response?.data as {
            error: GenericError;
            redirect_browser_to: string;
          };
          if (data?.redirect_browser_to) {
            window.location.href = data.redirect_browser_to;
          }
        }),
    [flow?.id]
  );

  return (
    <>
      <Grid
        container
        sx={{ minHeight: "100vh", backgroundImage: GRADIENTS.primary }}
      >
        <Grid item sx={{ display: { xs: "none", sm: "flex" } }} sm={6}>
          <SideBar />
        </Grid>
        <Grid item sx={{ display: { xs: "none", sm: "flex" } }} sm={6}>
          <Main login={login} loading={!flow} />
        </Grid>
      </Grid>
    </>
  );
}
