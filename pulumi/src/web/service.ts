import { DefangService } from "@defang-io/pulumi-defang/lib";
import * as pulumi from "@pulumi/pulumi";
import { config } from "../common/config";
import { ROOT_URL } from "../common/constants";
import { SERVICE_NAME, SERVICE_ROOT_PATH } from "./constants";
import { execFileSync } from "child_process";

export const service: DefangService = new DefangService(SERVICE_NAME, {
  name: `${SERVICE_NAME}-${pulumi.getStack()}`,
  build: {
    context: SERVICE_ROOT_PATH,
    args: {
      NEXT_PUBLIC_FABRIC: `${config.require("fabric")}`,
      NEXT_PUBLIC_FN_URL: `${ROOT_URL}/svc/fn`,
      NEXT_PUBLIC_GOOGLE_ANALYTICS: config.require("googleAnalytics"),
      NEXT_PUBLIC_GRAPHQL_URL: `${ROOT_URL}/svc/hasura/v1/graphql`,
      NEXT_PUBLIC_KRATOS_PUBLIC_URL: `${ROOT_URL}/svc/kratos`,
      NEXT_PUBLIC_SEGMENT_WRITE_KEY: config.require("segmentWriteKey"),
      NEXT_PUBLIC_VERSION: gitDescribe() || "unknown",
    },
  },
  environment: {
    PORT: "3000",
    HOSTNAME: "0.0.0.0", // required for the healthcheck to work
  },
  ports: [{ target: 3000, protocol: "http", mode: "host" }],
  healthcheck: {
    test: ["CMD", "wget", "--spider", "http://localhost:3000/"],
  },
  platform: "linux/arm64",
  waitForSteadyState: true,
});

function gitDescribe(): string {
  return (
    execFileSync(
      "/usr/bin/env",
      ["git", "describe", "--tags", "--always", "--dirty"],
      { encoding: "utf8", stdio: ["pipe", "pipe", "inherit"] }
    ).trim()
  );
}
