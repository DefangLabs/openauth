"use client";

import { Loader } from "@/components/loader/loader";
import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import { useSetUriFlow } from "@/modules/kratos/hooks/use-set-uri-flow/use-set-uri-flow";
import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";
import { GitHub } from "@mui/icons-material";
import { Box, Button, Divider, Link, Typography } from "@mui/material";
import { GenericError, LoginFlow } from "@ory/client";
import { AxiosError } from "axios";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function LoginPage() {
  const [flow, setFlow] = useState<LoginFlow>();
  const router = useRouter();
  const search = useSearchParams();
  const setUriFlow = useSetUriFlow();
  const pathname = usePathname();
  const isRegister = pathname === "/auth/register";
  const verb = isRegister ? "Register" : "Login";

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
              router.push("/");
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

  const login = useCallback(() => {
    analytics.track(EVENTS.login);
    return kratosClient
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
      });
  }, [flow?.id]);

  return (
    <>
      <Box flexGrow={1} />
      <Image
        src="/DEFANG-1_4x-no-text-256.svg"
        height={100}
        width={100}
        alt="Defang logo"
      />
      <Typography variant="h2">
        {isRegister ? "Register for Defang" : "Login to Defang"}
      </Typography>
      {!flow ? (
        "Loading..."
      ) : (
        <Button onClick={login} variant="contained" disableElevation>
          <GitHub height={20} width={20} sx={{ mr: 1 }} />
          {verb} with GitHub
        </Button>
      )}
      {isRegister ? (
        <Link component={NextLink} href={"/auth/login"}>
          Have an account? Login.
        </Link>
      ) : (
        <Link component={NextLink} href={"/auth/register"}>
          Don&apos;t have an account? Register.
        </Link>
      )}
      <Box flexGrow={1} />
      <Typography fontSize={14} width={300} align="center">
        By proceeding you are agreeing to our{" "}
        <a href="https://defang.io/terms-conditions.html" target="_blank">
          Terms and Conditions
        </a>
      </Typography>
    </>
  );
}

export default function Login() {
  return (
    <Loader>
      <LoginPage />
    </Loader>
  );
}
