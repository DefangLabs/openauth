import { createContext } from "react";
import { FrontendApi } from "@ory/kratos-client";

const kratosClient = new FrontendApi(
    undefined,
    process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL
);

if (typeof window !== 'undefined') {
    (window as any).kratos = kratosClient;
}

export const kratosContextDefaultValue = {
    kratosClient: kratosClient,
};

export const KratosContext = createContext(kratosContextDefaultValue);
