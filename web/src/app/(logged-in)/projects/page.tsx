import { requireAuth } from "@/modules/auth/lib/require-auth";
import { Projects } from "./components/projects/projects";

export default async function ProjectsPage() {
  await requireAuth();
  return <Projects />;
}
