import { requireAuth } from "@/modules/auth/lib/require-auth";
import Deployments from "./components/deployments/deployments";

export default async function DeploymentsPage() {
  await requireAuth({
    redirectPath: "/deployments",
  });
  return <Deployments />;
}
