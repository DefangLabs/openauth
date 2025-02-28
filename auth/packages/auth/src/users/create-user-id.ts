import { v4 as uuidv4 } from "uuid";
import { v5 as uuidv5 } from "uuid";

export function createLegacyId(
    username: string,
) {
    return uuidv5(username, "a04e192c-1c04-5664-969b-e96663025a22")
}

interface createUserIdOptions {
    githubUsername?: string;
}

export function createUserId(opts: createUserIdOptions = {}) {
    if(opts.githubUsername) {
        console.log('@@ creating legacy: ', opts.githubUsername);
        return createLegacyId(opts.githubUsername);
    }
    return uuidv4();
}