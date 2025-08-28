import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

const uuidSpaceGH = "a04e192c-1c04-5664-969b-e96663025a22"; // same as Fabric

export function createLegacyId(username: string) {
  return uuidv5(username, uuidSpaceGH);
}

interface createUserIdOptions {
  githubUsername?: string;
}

export function createUserId(opts: createUserIdOptions = {}) {
  if(opts.githubUsername) {
      return createLegacyId(opts.githubUsername);
  }
  return uuidv4();
}
