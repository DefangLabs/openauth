import assert from "assert";
import crypto from "crypto";
import { v5 as uuidv5 } from "uuid";
import { EnabledProviders } from "../providers/providers";

/**
 * Keep for reference. This is how the account key was generated in Fabric.
 */
function getHashedAccountKey(provider: string, providerId: string) {
  const accountPrefix = "account:";
  const globalIdPepper = process.env.GLOBAL_ID_PEPPER; // Replace with actual pepper value

  assert(globalIdPepper, "GLOBAL_ID_PEPPER is not set");

  const accountId = `${provider}:${providerId}`;
  const hash = crypto.createHash("sha256");
  hash.update(accountId);

  // Apply the pepper at the final stage
  const pepperedHash = hash.digest(); // Returns a Buffer
  const finalHash = Buffer.concat([
    new Uint8Array(pepperedHash),
    new Uint8Array(Buffer.from(globalIdPepper!)),
  ]);

  return accountPrefix + finalHash.toString("hex");
}

export function createAccountId(
  provider: EnabledProviders,
  providerId: string
) {
  const providerSpace = uuidv5(provider, uuidv5.DNS);
  return uuidv5(providerId, providerSpace);
}
