import {
  MarketplaceMeteringClient,
  ResolveCustomerCommand,
} from "@aws-sdk/client-marketplace-metering";
import { Context } from "hono";
import { authorizeRequest } from "../../lib/auth/authorize-request";
import { getHasuraClient } from "../../lib/hasura/client";
import { UpdateTenantAwsMarketplace } from "./aws-marketplace-mutation";

const client = new MarketplaceMeteringClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export async function resolveCustomer(c: Context) {
  try {
    const req = c.req;
    const claims = await authorizeRequest(req);
    const tenantId = claims.sub; // FIXME: use currently selected tenant ID instead

    if (!tenantId) {
      throw new Error("No subject found in JWT");
    }

    // Get token from request body (from GraphQL mutation)
    const json = await c.req.json();
    const { registrationToken } = json.input.input;

    if (!registrationToken) {
      return c.json({ message: "Marketplace token is required" }, 400);
    }

    const command = new ResolveCustomerCommand({
      RegistrationToken: registrationToken,
    });

    let response;
    if (!process.env.AWS_REGION) {
      response = {
        CustomerAWSAccountId: "mock-account-id",
        CustomerIdentifier: "mock-customer-id",
        ProductCode: "mock-product-code",
      };
    } else {
      response = await client.send(command);
    }

    // Atomically update tenant only if marketplace fields are null
    const hasura = getHasuraClient();
    const tenantUpdateResult = await hasura.fetch(UpdateTenantAwsMarketplace, {
      tenantId,
      customerIdentifier: response.CustomerIdentifier || "",
      accountId: response.CustomerAWSAccountId || "",
      productCode: response.ProductCode || "",
    });

    if (tenantUpdateResult.errors?.length > 0) {
      console.error("Hasura errors:", tenantUpdateResult.errors);
      return c.json(
        { message: "Failed to update tenant with AWS marketplace data" },
        500
      );
    }

    if (tenantUpdateResult.data?.updateTenants?.affectedRows === 0) {
      return c.json(
        { message: "Tenant not found or subscribed to different product" },
        404
      );
    }

    return c.json({
      customerAWSAccountId: response.CustomerAWSAccountId,
      customerIdentifier: response.CustomerIdentifier,
      productCode: response.ProductCode,
    });
  } catch (error) {
    console.error("AWS Marketplace subscription error:", error);
    return c.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
}
