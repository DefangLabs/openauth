import { Configuration, FrontendApi } from "@ory/client";

console.log("@@ KRATOS: ", process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL);

export const kratosClient = new FrontendApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL,
    baseOptions: {
      withCredentials: true,
    },
  })
);

if (typeof window !== "undefined") {
  (window as any).kratos = kratosClient;
}
