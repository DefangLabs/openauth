"use client";

import { ResolveAwsMarketplaceCustomerMutation } from "@/modules/aws-marketplace/graphql/mutations/subscribe-aws-marketplace-mutation";
import { useMutation } from "@apollo/client";
import useSWR from "swr";
import { getMarketplaceToken } from "./actions";
import { redirect } from "next/navigation";

export default function AwsMarketplaceSubscribeComponent() {
  const [
    resolveAwsMarketplaceCustomer,
    { data: customerData, loading: customerLoading, error },
  ] = useMutation(ResolveAwsMarketplaceCustomerMutation);

  const { data: registrationToken, isLoading: tokenLoading } = useSWR(
    "marketplaceToken",
    getMarketplaceToken,
    {
      async onSuccess(registrationToken, key, config) {
        if (registrationToken) {
          await resolveAwsMarketplaceCustomer({
            variables: {
              input: {
                registrationToken,
              },
            },
          });
          redirect("/pricing/success");
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
    // blank page as we redirect
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>AWS Marketplace Subscription</h1>
      <p>Processing...</p>
    </div>
  );
}
