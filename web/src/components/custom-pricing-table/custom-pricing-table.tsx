"use client";

import { ReactNode, useEffect, useState } from "react";
// Replace imports with MUI components
import { CreateStripePortalSessionMutation } from "@/modules/stripe/graphql/mutations/create-stripe-portal-session-mutation";
import { useMutation } from "@apollo/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";
import { SubscriptionTier } from "@/modules/defang/generated/fabric_pb";

const freqs: {
  value: "monthly" | "annually";
  label: string;
  priceSuffix: string;
}[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/user /month" },
  { value: "annually", label: "Annually", priceSuffix: "/user /year" },
];

const plans: {
  name: string;
  id: string;
  href: string;
  price: { monthly: string; annually: string };
  description: string;
  apiId?: SubscriptionTier;
  features: {
    type: "title" | "content";
    title?: string;
    content: string;
    caveat?: string;
  }[];
  mostPopular: boolean;
  cta?: {
    label: string;
    href: string;
  };
}[] = [
  {
    name: "Hobby",
    id: "hobby",
    href: "#",
    price: { monthly: "Free", annually: "Free" },
    description: "Start in the Defang Playground",
    apiId: SubscriptionTier.HOBBY,
    features: [
      {
        type: "content",
        title: "Use Case",
        content: "For Testing Purposes Only",
      },
      {
        type: "content",
        title: "Target Platforms",
        content: "Defang Playground",
      },
      {
        type: "content",
        title: "Projects and Environments",
        content: "Max 1 project x 1 environment",
      },
      {
        type: "content",
        title: "Compute",
        content: "Max 4 services, 1 GB memory, 1 vCPU",
      },
      {
        type: "content",
        title: "Network",
        content: "2 ingress ports",
      },
      {
        type: "content",
        title: "Storage",
        content: "Ephemeral Postgres and Redis",
      },
      {
        type: "content",
        title: "Domain",
        content: "Bring-Your-Own-Domain (but no apex domains)",
      },
      {
        type: "content",
        title: "AI",
        content: "Generate + Debug with small model",
      },
      {
        type: "content",
        title: "Data Usage",
        content: "Data may be used for AI Training",
      },
      {
        type: "content",
        title: "Support",
        content: "Community support via Public Discord Channel",
      },
    ],
    mostPopular: false,
  },
  {
    name: "Personal",
    id: "personal",
    href: "#",
    price: { monthly: "$10", annually: "$100" },
    description: "Deploy your personal project.",
    apiId: SubscriptionTier.PERSONAL,
    features: [
      {
        type: "content",
        title: "Use Case",
        content: "Certified for Production Use",
      },
      {
        type: "content",
        title: "Target Platforms",
        content: "Defang Playground + BYOC (1 cloud)",
      },
      {
        type: "content",
        title: "Projects and Environments",
        content: "Max 1 project x 3 environments",
      },
      {
        type: "content",
        title: "Compute",
        content: "Container Service with Spot instances only",
      },
      {
        type: "content",
        title: "Network",
        content: "App. Load Balancer",
      },
      {
        type: "content",
        title: "Storage",
        content: "Managed Postgres and Redis Services",
      },
      {
        type: "content",
        title: "Domain",
        content: "Bring-Your-Own-Domain with apex domain support",
      },
      {
        type: "content",
        title: "AI",
        content: "Generate + Debug with small model.",
      },
      {
        type: "content",
        title: "Data Usage",
        content: "Data may be used for AI Training",
      },
      {
        type: "content",
        title: "Support",
        content:
          "Team support via Public Discord Channel - 3 day response time",
      },
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    price: { monthly: "$30", annually: "$300" },
    description: "Deploy professional applications.",
    apiId: SubscriptionTier.PRO,
    features: [
      {
        type: "content",
        title: "Use Case",
        content: "Certified for Production Use",
      },
      {
        type: "content",
        title: "Target Platforms",
        content: "Defang Playground + BYOC (2 clouds)",
      },
      {
        type: "content",
        title: "Projects and Environments",
        content: "Max 10 projects x 3 environments",
      },
      {
        type: "content",
        title: "Compute",
        content: "Container Service with GPUs, Autoscaling, On-demand",
      },
      {
        type: "content",
        title: "Network",
        content: "App. Load Balancer",
      },
      {
        type: "content",
        title: "Storage",
        content: "Managed Postgres and Redis Services",
      },
      {
        type: "content",
        title: "Domain",
        content: "Bring-Your-Own-Domain with apex domain support",
      },
      {
        type: "content",
        title: "AI",
        content: "Generate + Debug with large model.",
      },
      {
        type: "content",
        title: "Data Usage",
        content: "May opt out of AI Training",
      },
      {
        type: "content",
        title: "Support",
        content:
          "Team support via Public Discord Channel - 1 day response time",
      },
    ],
    mostPopular: false,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    href: "#",
    price: { monthly: "Contact us", annually: "Contact us" },
    description: "Deploy enterprise applications.",
    apiId: SubscriptionTier.TEAM,
    features: [
      {
        type: "content",
        title: "Use Case",
        content:
          "Custom pricing for advanced features, large teams, and dedicated support",
      },
    ],
    mostPopular: false,
    cta: {
      label: "Contact us",
      href: "mailto:sales@defang.io",
    },
  },
];

const faqs: {
  question: string;
  answer: ReactNode;
}[] = [
  {
    question: "What counts as a “project”?",
    answer: "A project is a collection of services defined by a Compose file.",
  },
  {
    question: "What do you mean by “environment”?",
    answer:
      "An environment is a specific configuration of a project, like Production, Staging, or Development.",
  },
  {
    question: "How do you count BYOC clouds?",
    answer:
      "BYOC clouds are counted as the unique cloud vendors you deploy to. For example, if you deploy to five different AWS accounts, that still just one BYOC cloud.",
  },
  {
    question: "Can multiple people work on the same “project”?",
    answer: "Yes, multiple people can collaborate on the same project.",
  },
  {
    question: "What if I have more than 10 projects?",
    answer: (
      <>
        If you have more than 10 projects, you may need to upgrade or{" "}
        <a className="link" href="mailto:sales@defang.io" target="_blank">
          get in touch with us.
        </a>
      </>
    ),
  },
  {
    question: "What does “Ephemeral Postgres and Redis” in Playground mean?",
    answer:
      "Defang can help you deploy managed Postgres and Redis instances in your own cloud account. In Playground, instead of deploying a managed database, we deploy the Postgres or Redis service in a container. This means that if you change its configuration, you will lose your data. The playground environment is intended for testing and learning purposes. Not for production use.",
  },
  {
    question: "What do you mean by “small model” versus “large model”?",
    answer:
      "Small models have limited capabilities. They are generally faster but aren't as capable as large models and thus less likely to to be able to solve more complex issues.",
  },
  {
    question: "What do you mean by “Team support” versus “Community support”?",
    answer:
      "Team support means you will get support from someone on the Defang team. Community support means you will get support from the Defang community. This may include Defang team members, but there is no guarantee.",
  },
  {
    question: "What do you mean by “apex domain”?",
    answer:
      "An apex domain is the root domain without any subdomains. For example example.com is an apex domain, but app.example.com is not.",
  },
  {
    question: "Why don’t you have annual pricing?",
    answer:
      "This is our introductory pricing model, and as such we are still solidifying what our longer term pricing will look like. We will be offering annual pricing in the future.",
  },
  {
    question:
      "Are Defang's BYOC deployments compliant with industry best practices?",
    answer: (
      <>
        Yes, Defang&apos;s BYOC deployments are compliant with industry best
        practices. Defang&apos;s deployments are compliant with{" "}
        <a
          href="https://www.cisecurity.org/cis-benchmarks"
          target="_blank"
          className="link font-bold"
        >
          CIS AWS Foundations Benchmark
        </a>{" "}
        and the{" "}
        <a
          href="https://aws.amazon.com/premiumsupport/business-support-well-architected/"
          target="_blank"
          className="link font-bold"
        >
          AWS Well-Architected Framework
        </a>
        . We will be adding additional compliance certifications in the future.
      </>
    ),
  },
];

export function CustomPricingTable() {
  const { data } = useWhoami();
  const currentTier = data?.tier;
  const [
    createStripePortalSession,
    { data: portalData, loading: stripeSessionLoading },
  ] = useMutation(CreateStripePortalSessionMutation);

  const portalUrl = portalData?.createStripePortalSession?.url;

  useEffect(() => {
    createStripePortalSession();
  }, [createStripePortalSession]);

  const [frequency, setFrequency] = useState(freqs[0]);

  const uniqueTitles = Array.from(
    new Set(
      plans.flatMap((plan) => plan.features.map((feature) => feature.title)),
    ),
  );

  return (
    <Container
      id="pricing"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        py: 5,
      }}
    >
      <Stack>
        <Typography variant="h1" fontSize={16} fontWeight={400}>
          Subscription
        </Typography>
        <Typography variant="h2">Introductory Limited Time Offer</Typography>
      </Stack>

      {/* PRICING TABLE */}
      <Box sx={{ overflowX: "auto", mt: 4 }}>
        <Table sx={{ backgroundColor: "transparent" }}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ backgroundColor: "transparent", borderBottom: "none" }}
              ></TableCell>
              {plans.map((tier, idx) => {
                const price = tier.price[frequency.value];
                // if this tier is a lower in the list than currentTier,
                // then verb should be downgrade, otherwise upgrade
                const verb =
                  idx < plans.findIndex((p) => p.apiId === currentTier)
                    ? "Downgrade"
                    : "Upgrade";

                const button = (
                  <Button
                    variant="contained"
                    href={tier.cta?.href || portalUrl}
                    fullWidth
                    disabled={
                      tier.apiId === currentTier || stripeSessionLoading
                    }
                    sx={{
                      mt: 2,
                      backgroundColor: "white",
                      color: "#066ebc",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    {stripeSessionLoading && <CircularProgress size={24} />}
                    {tier.apiId === currentTier
                      ? "Current"
                      : tier.cta?.label || verb}
                  </Button>
                );

                return (
                  <TableCell
                    key={tier.id}
                    style={{
                      padding: 0,
                      borderBottom: "none",
                      verticalAlign: "bottom",
                    }}
                  >
                    <Box sx={{ px: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#066ebc",
                          color: "common.white",
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          borderTopLeftRadius: 32, // Heavily rounded corners
                          borderTopRightRadius: 32, // Heavily rounded corners
                          py: 4, // Increase vertical padding
                        }}
                      >
                        <Typography variant="h6">{tier.name}</Typography>
                        <Typography variant="h4" sx={{ mt: 2 }}>
                          {price}
                        </Typography>
                        {!["Free", "Contact us"].includes(price) && (
                          <Typography variant="subtitle1">
                            {frequency.priceSuffix}
                          </Typography>
                        )}
                        {button}
                      </Box>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#FFFFFF" }}>
            {uniqueTitles.map((title, rowIndex) => (
              <TableRow key={title}>
                <TableCell
                  sx={{
                    // Apply border radius to top-left and bottom-left cells
                    ...(rowIndex === 0 && {
                      borderTopLeftRadius: 16,
                    }),
                    ...(rowIndex === uniqueTitles.length - 1 && {
                      borderBottomLeftRadius: 16,
                    }),
                    // Remove border at the bottom of the last row
                    ...(rowIndex === uniqueTitles.length - 1 && {
                      borderBottom: "none",
                    }),
                  }}
                >
                  {title}
                </TableCell>
                {plans.map((plan, cellIndex) => {
                  const feature = plan.features.find(
                    (feature) => feature.title === title,
                  );
                  return (
                    <TableCell
                      key={plan.id}
                      sx={{
                        // Apply border radius to top-right and bottom-right cells
                        ...(rowIndex === 0 &&
                          cellIndex === plans.length - 1 && {
                            borderTopRightRadius: 16,
                          }),
                        ...(rowIndex === uniqueTitles.length - 1 &&
                          cellIndex === plans.length - 1 && {
                            borderBottomRightRadius: 16,
                          }),
                        // Remove border at the bottom of the last row
                        ...(rowIndex === uniqueTitles.length - 1 && {
                          borderBottom: "none",
                        }),
                      }}
                    >
                      {feature ? feature.content : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ mt: 8, maxWidth: "lg", mx: "auto" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {typeof faq.answer === "string" ? (
                <Typography>{faq.answer}</Typography>
              ) : (
                faq.answer
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box height={100} />
    </Container>
  );
}
