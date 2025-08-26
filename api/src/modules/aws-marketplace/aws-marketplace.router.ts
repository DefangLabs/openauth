import { Hono } from "hono";
import { resolveCustomer } from "./aws-marketplace.service";

export const awsMarketplaceRouter = new Hono();

awsMarketplaceRouter.post("/resolve", resolveCustomer);
