"use client";

import { useSetUriFlow } from "@/modules/kratos/hooks/use-set-uri-flow/use-set-uri-flow";
import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";
import { Button, Typography } from "@mui/material";
import { LoginFlow, UpdateLoginFlowBody, GenericError } from "@ory/client";
import { UserAuthCard } from "@ory/elements";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function LoginPage() {
  const [flow, setFlow] = useState<LoginFlow>();
  const router = useRouter();
  const search = useSearchParams();
  const setUriFlow = useSetUriFlow();

  const flowId = search.get("flow") || "";
  const returnTo = search.get("return_to") || "";
  const refresh = Boolean(search.get("refresh"));
  const aal = String(search.get("aal") || "");

  const handleError = useCallback((error: AxiosError) => {
    console.error(error);
  }, []);

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
    [handleError, setUriFlow]
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

  const submitFlow = (values: UpdateLoginFlowBody) =>
    kratosClient
      .updateLoginFlow({
        flow: String(flow?.id),
        updateLoginFlowBody: values,
      })
      // We logged in successfully! Let's bring the user home.
      .then(() => {
        if (flow?.return_to) {
          window.location.href = flow?.return_to;
          return;
        }
        router.push("/");
      })
      .catch(handleError);

  return flow ? (
    <>
      <Button
        onClick={() =>
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
            })
        }
      >
        Login
      </Button>
    </>
  ) : (
    <Typography>Loading...</Typography>
  );
}
