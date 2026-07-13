export function parseScopes(scope: string | null | undefined) {
  return scope?.split(" ").filter((s) => s)
}

export function validateScopes(
  tokenReq?: string | null,
  authorizeReq?: string[],
) {
  if (!authorizeReq?.length || tokenReq === null || tokenReq === undefined) {
    return authorizeReq
  }
  const tokenScopes = new Set(parseScopes(tokenReq));
  return authorizeReq.filter(scope => tokenScopes.has(scope));
}
