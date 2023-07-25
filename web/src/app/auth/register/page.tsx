"use client";

import { useSetUriFlow } from "@/modules/kratos/hooks/use-set-uri-flow/use-set-uri-flow";
import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";
import { GitHub } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  GenericError,
  RegistrationFlow,
  UpdateRegistrationFlowBody,
} from "@ory/client";
import { UserAuthCard } from "@ory/elements";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function RegisterPage() {
  const [tosAgreed, setTosAgreed] = useState(false);
  const [flow, setFlow] = useState<RegistrationFlow>();
  const router = useRouter();
  const search = useSearchParams();
  const setUriFlow = useSetUriFlow();

  const flowId = search.get("flow") || "";
  const returnTo = search.get("return_to") || "";

  const getFlow = useCallback(
    (id: string) =>
      kratosClient
        .getRegistrationFlow({ id })
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data);
          setUriFlow(data.id);
        })
        .catch((error) => console.log(error)),
    [setUriFlow]
  );

  const createFlow = useCallback(
    (returnTo: string) =>
      kratosClient
        .createBrowserRegistrationFlow({ returnTo })
        .then(({ data }) => {
          setFlow(data);
          setUriFlow(data.id);
        })
        .catch((error) => console.log(error)),
    [setUriFlow]
  );

  useEffect(() => {
    if (flowId) {
      getFlow(flowId).catch((error) => createFlow(returnTo));
      return;
    } else {
      createFlow(returnTo);
    }
  }, [createFlow, flowId, getFlow, returnTo]);

  const submitFlow = (values: UpdateRegistrationFlowBody) => {
    kratosClient
      .updateRegistrationFlow({
        flow: flowId,
        updateRegistrationFlowBody: values,
      })
      .then(() => {
        router.push(returnTo ?? "/");
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const register = useCallback(async () => {
    kratosClient
      .updateRegistrationFlow({
        flow: flowId,
        updateRegistrationFlowBody: {
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
  }, [flowId]);

  return (
    <>
      <Typography variant="h2">Welcome to Defang</Typography>
      {!flow ? (
        "Loading..."
      ) : (
        <Button
          onClick={register}
          variant="contained"
          disableElevation
          disabled={!tosAgreed}
        >
          <GitHub height={20} width={20} sx={{ mr: 1 }} />
          Sign in with GitHub
        </Button>
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={tosAgreed}
            onChange={(e) => setTosAgreed(e.target.checked)}
          />
        }
        label={
          <Typography fontSize={14} width={300}>
            By proceeding you are agreeing to our{" "}
            <a href="https://defang.io/terms-conditions.html" target="_blank">
              Terms and Conditions
            </a>
            . Check the box to proceed.
          </Typography>
        }
      />
      <Divider />
      <Typography>
        If you already have an account, please{" "}
        <Link href="/auth/login">login</Link>.
      </Typography>
    </>
  );
}
