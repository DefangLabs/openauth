import { GithubProvider } from "@openauthjs/openauth/provider/github";
import assert from "assert";
import { array, boolean, number, object, parse, string } from 'valibot';
import { ProviderData } from "./provider-data-schema";

const GithubUserSchema = object({
  id: number(),
  login: string(),
});

const GithubEmailSchema = object({
  email: string(),
  primary: boolean(),
  verified: boolean(),
});


const GithubOrgSchema = object({
  id: number(),
  login: string(),
});

export async function getGithubData(token: string): Promise<ProviderData> {
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const userResPromise = fetch('https://api.github.com/user', { headers })
  const emailResPromise = fetch('https://api.github.com/user/emails', { headers })
  const orgsResPromise = fetch('https://api.github.com/user/orgs', { headers })

  const [userRes, emailRes, orgsRes] = await Promise.all([userResPromise, emailResPromise, orgsResPromise]);

  if (!userRes.ok) {
    throw new Error(`Failed to fetch user data from GitHub`);
  }
  if (!emailRes.ok) {
    throw new Error('Failed to fetch email data from GitHub');
  }
  if (!orgsRes.ok) {
    throw new Error('Failed to fetch orgs data from GitHub');
  }

  const userData = parse(GithubUserSchema, await userRes.json());
  const emailData = parse(array(GithubEmailSchema), await emailRes.json());
  const orgsData = parse(array(GithubOrgSchema), await orgsRes.json());
  const orgs = orgsData.map(org => ({
    id: org.id.toString(),
    name: org.login,
  }));

  let email = emailData.find(e => e.primary && e.verified)?.email
  if (!email) {
    email = emailData.find(e => e.verified)?.email
  }
  const id = userData.id.toString()

  if (!email || !id) {
    throw new Error('Required GitHub user data missing');
  }

  return {
    id: id as ProviderData['id'],
    email: email as ProviderData['email'],
    name: userData.login,
    username: userData.login,
    orgs,
  }
}

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

assert(githubClientId, 'GITHUB_CLIENT_ID is required')
assert(githubClientSecret, 'GITHUB_CLIENT_SECRET is required')

export const githubProvider = GithubProvider({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  scopes: ['read:org', 'user:email'],
})