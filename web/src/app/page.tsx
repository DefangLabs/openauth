import { requireAuth } from "@/modules/auth/lib/require-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  await requireAuth();

  return redirect("/projects");
}
