import { requireAuth } from "@/modules/auth/lib/require-auth";
import { Account } from "./components/account/account";

export default async function AccountPage() {
  await requireAuth();
  return <Account />;
}
