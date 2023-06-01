import { FrontendApi } from "@ory/client";
import { createContext } from "react";
import { kratosClient } from "../../lib/kratos-client/kratos-client";

interface KratosContext {
  kratosClient: FrontendApi;
}

export const kratosContextDefaultValue = {
  kratosClient: kratosClient,
};

export const KratosContext = createContext(kratosContextDefaultValue);
