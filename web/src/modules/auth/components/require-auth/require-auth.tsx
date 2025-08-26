import { requireAuth } from "../../lib/require-auth";
import { RequireAuthClient } from "./require-auth-client";

type RequireAuthProps = NonNullable<Parameters<typeof requireAuth>[0]> & {
  children: React.ReactNode;
};

export async function RequireAuth(props: RequireAuthProps) {
  const { children, ...rest } = props;

  await requireAuth(rest);

  return <RequireAuthClient>{children}</RequireAuthClient>;
}
