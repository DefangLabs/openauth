import { Context } from "hono";

export function getTenantIdFromHeader(req: Context["req"]) {
  const tenantId = req.header('X-Defang-Tenant-Id');
  if (!tenantId) {
    throw new Error('No tenant ID found in header');
  }
  return tenantId;
}