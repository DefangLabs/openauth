import { GithubProvider } from "@openauthjs/openauth/provider/github";
import assert from "assert";
import { object, string, number, array, boolean, parse } from 'valibot';
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

export async function getGithubData(token: string): Promise<ProviderData> {
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const userRes = await fetch('https://api.github.com/user', { headers })
  const emailRes = await fetch('https://api.github.com/user/emails', { headers })

  const userData = parse(GithubUserSchema, await userRes.json());
  const emailData = parse(array(GithubEmailSchema), await emailRes.json());

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