import { DefangService } from "@defang-io/pulumi-defang/lib";
import * as pulumi from "@pulumi/pulumi";
import { config } from "../common/config";
import { ROOT_URL } from "../common/constants";
import { SERVICE_NAME, SERVICE_ROOT_PATH } from "./constants";

export const service: DefangService = new DefangService(SERVICE_NAME, {
  name: `${SERVICE_NAME}-${pulumi.getStack()}`,
  build: {
    context: SERVICE_ROOT_PATH,
    args: {
      NEXT_PUBLIC_FABRIC: `https://${config.require("fabric")}`,
      NEXT_PUBLIC_FN_URL: `${ROOT_URL}/svc/fn`,
      NEXT_PUBLIC_GOOGLE_ANALYTICS: config.require("googleAnalytics"),
      NEXT_PUBLIC_GRAPHQL_URL: `${ROOT_URL}/svc/hasura/v1/graphql`,
      NEXT_PUBLIC_KRATOS_PUBLIC_URL: `${ROOT_URL}/svc/kratos`,
      NEXT_PUBLIC_SEGMENT_WRITE_KEY: config.require("segmentWriteKey"),
    },
  },
  environment: { PORT: "3000" },
  ports: [{ target: 3000, protocol: "http", mode: "host" }],
  healthcheck: {
    test: ["CMD", "curl", "http://localhost:3000/"],
  },
  platform: "linux/arm64",
});
