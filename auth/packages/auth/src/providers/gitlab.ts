import { GitlabProvider } from "../../../../openauth/packages/openauth/src/provider/gitlab";
import assert from "assert";
import { array, boolean, email, number, object, parse, string } from "valibot";
import { ProviderData } from "./provider-data-schema";

const GitlabUserSchema = object({
  id: number(),
  username: string(),
  email: string(),
});

const GitlabGroupSchema = object({
  id: number(),
  name: string(),
});

export async function getGitlabData(token: string): Promise<ProviderData> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const userResPromise = fetch("https://gitlab.com/api/v4/user", { headers });
  const groupsResPromise = fetch("https://gitlab.com/api/v4/groups?per_page=100", { headers });

  const [userRes, groupsRes] = await Promise.all([
    userResPromise,
    groupsResPromise,
  ]);

  if (!userRes.ok) {
    throw new Error(`Failed to fetch user data from GitLab`);
  }
  if (!groupsRes.ok) {
    throw new Error("Failed to fetch groups data from GitLab");
  }

  const userData = parse(GitlabUserSchema, await userRes.json());

  //TODO: need's to handle pagination for groups
  const groupsData = parse(array(GitlabGroupSchema), await groupsRes.json());
  const groups = groupsData.map((group) => ({
    id: group.id.toString(),
    name: group.name,
  }));

  const id = userData.id.toString();
  const email = userData.email

  if (!email || !id) {
    throw new Error("Required GitLab user data missing");
  }

  return {
    id: id as ProviderData["id"],
    email: email as ProviderData["email"],
    name: userData.username,
    username: userData.username,
    orgs: groups,
  };
}

const gitlabClientId = process.env.GITLAB_CLIENT_ID;
const gitlabClientSecret = process.env.GITLAB_CLIENT_SECRET;

assert(gitlabClientId, "GITLAB_CLIENT_ID is required");
assert(gitlabClientSecret, "GITLAB_CLIENT_SECRET is required");

export const gitlabProvider = GitlabProvider({
  clientID: gitlabClientId,
  clientSecret: gitlabClientSecret,
  scopes: ["read_user", "read_api"],
});
