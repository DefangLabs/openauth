import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";

export function useGithubLogin() {
  return async () => {
    kratosClient.createBrowserLoginFlow({});
  };
}
