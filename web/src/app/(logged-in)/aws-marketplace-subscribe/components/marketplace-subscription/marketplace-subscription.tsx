"use client";

import { ResolveAwsMarketplaceCustomerMutation } from "@/modules/aws-marketplace/graphql/mutations/subscribe-aws-marketplace-mutation";
import { useMutation } from "@apollo/client";
import useSWR from "swr";
import { getMarketplaceToken } from "./actions";

export default function AwsMarketplaceSubscribeComponent() {
  const [
    resolveAwsMarketplaceCustomer,
    { data: customerData, loading: customerLoading, error },
  ] = useMutation(ResolveAwsMarketplaceCustomerMutation);

  const { data: registrationToken, isLoading: tokenLoading } = useSWR(
    "marketplaceToken",
    getMarketplaceToken,
    {
      onSuccess(registrationToken, key, config) {
        if (registrationToken) {
          resolveAwsMarketplaceCustomer({
            variables: {
              input: {
                registrationToken,
              },
            },
          });
        } else {
          throw Error("No AWS Marketplace registration token found");
        }
      },
      revalidateOnFocus: false,
    },
  );

  if (tokenLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>AWS Marketplace Subscription</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!registrationToken) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>AWS Marketplace Subscription</h1>
        <p>No marketplace token provided.</p>
        <p style={{ fontSize: "12px", color: "#666" }}>
          URL: {registrationToken || "none"}
        </p>
        <a href="/aws-marketplace">Go back</a>
      </div>
    );
  }

  if (customerLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>AWS Marketplace Subscription</h1>
        <p>Processing your subscription...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>AWS Marketplace Subscription</h1>
        <p>Error: {error.message}</p>
        <a href="/aws-marketplace">Try again</a>
      </div>
    );
  }

  if (customerData?.resolveAwsMarketplaceCustomer) {
    const result = customerData.resolveAwsMarketplaceCustomer;
    return (
      <div style={{ padding: "20px" }}>
        <h1>AWS Marketplace Subscription</h1>
        <p>AWS Account ID: {result.customerAWSAccountId}</p>
        <p>Customer ID: {result.customerIdentifier}</p>
        <p>Product Code: {result.productCode}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>AWS Marketplace Subscription</h1>
      <p>Processing...</p>
    </div>
  );
}
