"use client";

import { useSetUriFlow } from "@/modules/kratos/hooks/use-set-uri-flow/use-set-uri-flow";
import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";
import { Typography } from "@mui/material";
import { RegistrationFlow, UpdateRegistrationFlowBody } from "@ory/client";
import { UserAuthCard } from "@ory/elements";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function LoginPage() {
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

  return flow ? (
    <>
      <Typography variant="h1">Login</Typography>
      <UserAuthCard
        title="Register"
        flowType="registration"
        flow={flow}
        additionalProps={{
          loginURL: "/auth/login",
        }}
        includeScripts
        onSubmit={({ body }) => submitFlow(body as UpdateRegistrationFlowBody)}
      />
    </>
  ) : (
    <Typography>Loading...</Typography>
  );
}
