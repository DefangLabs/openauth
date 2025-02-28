"use client";

import { CreateStripeSecretMutation } from "@/modules/stripe/graphql/mutations/create-stripe-secret-mutation";
import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { PageLoading } from "../page-loading/page-loading";
import { Stack, Typography } from "@mui/material";

export function StripePricingTable() {
  const [createStripeSecret, { data: secretData }] = useMutation(
    CreateStripeSecretMutation,
  );

  const secret = secretData?.createStripeSecret?.secret;

  useEffect(() => {
    createStripeSecret();
  }, [createStripeSecret]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!secret) {
    return <PageLoading />;
  }

  const pricingTable = React.createElement("stripe-pricing-table", {
    "pricing-table-id": process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID,
    "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    "customer-session-client-secret": secret,
  });

  return (
    <Stack p={0} spacing={2} direction="column" mb={10}>
      <Stack p={2}>
        <Typography variant="h1" fontSize={16} fontWeight={400}>
          Subscription
        </Typography>
        <Typography variant="h2">Introductory Limited Time Offer</Typography>
      </Stack>
      {pricingTable}
    </Stack>
  );
}
