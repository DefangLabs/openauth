"use client";

import { ReactNode, useEffect, useState } from "react";
// Replace imports with MUI components
import { useWhoami } from "@/modules/defang/hooks/use-whoami/use-whoami";
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
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { SubscriptionTier } from "@/modules/defang/generated/fabric_pb";
import { CreateStripeCheckoutSessionMutation } from "@/modules/stripe/graphql/mutations/create-stripe-checkout-mutation";

const freqs: {
  value: "monthly" | "annually";
  label: string;
  priceSuffix: string;
}[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/user/month" },
  { value: "annually", label: "Annually", priceSuffix: "/user/year" },
];

const plans: {
  name: string;
  id: string;
  href: string;
  price: { monthly: string; annually: string };
  description: ReactNode;
  tier: SubscriptionTier;
  matchTiers: SubscriptionTier[];
  features: {
    type: "title" | "content";
    title?: string;
    content: string;
    caveat?: string;
  }[];

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
    tier: SubscriptionTier.HOBBY,
    matchTiers: [
      SubscriptionTier.SUBSCRIPTION_TIER_UNSPECIFIED,
      SubscriptionTier.HOBBY,
    ],
    description: (
      <>
        Kick the tires for free by deploying your hackathon / hobby projects to
        our Playground environment. Limited in scale, features, and persistence.
      </>
    ),
    features: [
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
  },
  {
    name: "Personal",
    id: "personal",
    href: "#",
    price: { monthly: "$10", annually: "$100" },
    tier: SubscriptionTier.PERSONAL,
    matchTiers: [SubscriptionTier.PERSONAL],
    description: (
      <>
        Deploy that one personal or side-hustle application {"you've"} been
        working on to your own cloud account without restrictions. Limited AI
        features and support.
      </>
    ),
    features: [
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
        content: "Data not used for AI training unless explicitly opted in.",
      },
      {
        type: "content",
        title: "Support",
        content:
          "Team support via Public Discord Channel - 3 day response time",
      },
    ],
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    price: { monthly: "$30", annually: "$300" },
    tier: SubscriptionTier.PRO,
    matchTiers: [SubscriptionTier.PRO],
    description: (
      <>
        Deploy multiple projects across multiple clouds. Great for every-day
        production use for complex projects in startups and software studios.
      </>
    ),
    features: [
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
        content: "Data not used for AI training unless explicitly opted in.",
      },
      {
        type: "content",
        title: "Support",
        content:
          "Team support via Public Discord Channel - 1 day response time",
      },
    ],
  },
  {
    name: "Enterprise",
    id: "enterprise",
    href: "#",
    price: { monthly: "Contact us", annually: "Contact us" },
    tier: SubscriptionTier.TEAM,
    matchTiers: [SubscriptionTier.TEAM],
    description: (
      <>
        Coming soon, with collaboration and control features specifically
        targeted for enterprise use cases. Enterprise-grade support.
      </>
    ),

    features: [
      // {
      //   type: "content",
      //   title: "Use Case",
      //   content:
      //     "Custom pricing for advanced features, large teams, and dedicated support",
      // },
    ],

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

type PlanPriceIDs = {
  MONTHLY: string;
  YEARLY: string;
};

type PlanPrices = {
  PERSONAL: PlanPriceIDs;
  PRO: PlanPriceIDs;
};

if (!process.env.NEXT_PUBLIC_PRICE_IDS) {
  throw new Error("NEXT_PUBLIC_PRICE_IDS is not defined");
}

console.log("@@ PLAN_PRICES", process.env.NEXT_PUBLIC_PRICE_IDS);
const prices = JSON.parse(process.env.NEXT_PUBLIC_PRICE_IDS) as PlanPrices;

export function CustomPricingTable() {
  const { data } = useWhoami();
  let currentTier = data?.tier;

  if (
    currentTier === undefined ||
    currentTier === SubscriptionTier.SUBSCRIPTION_TIER_UNSPECIFIED
  ) {
    currentTier = SubscriptionTier.HOBBY;
  }

  // if the user has a paid plan already, we send them to the portal
  // otherwise we create a checkout linke when they click
  const linkToStripePortal = [
    SubscriptionTier.PERSONAL,
    SubscriptionTier.PRO,
    SubscriptionTier.TEAM,
  ].includes(currentTier ?? SubscriptionTier.SUBSCRIPTION_TIER_UNSPECIFIED);

  const [createStripePortalSession, { loading: stripeSessionLoading }] =
    useMutation(CreateStripePortalSessionMutation as any);

  const [createStripeCheckoutSession, { loading: checkoutLoading }] =
    useMutation(CreateStripeCheckoutSessionMutation as any);

  const anythingLoading = stripeSessionLoading || checkoutLoading;

  const [frequency, setFrequency] = useState(freqs[0]);

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
        {linkToStripePortal && (
          <Button
            variant="outlined"
            onClick={async () => {
              const { data } = await createStripePortalSession();
              window.location.href = data?.createStripePortalSession?.url;
            }}
            sx={{ mt: 2, width: "fit-content" }}
          >
            Manage your subscription
          </Button>
        )}
      </Stack>

      {/* PRICING TABLE */}
      <Box
        sx={{
          display: {
            xs: "flex",
            lg: "grid",
          },
          gap: 2,
          mt: 4,
          overflowX: {
            xs: "auto",
            lg: "unset",
          },
          gridTemplateColumns: {
            lg: "repeat(4, 1fr)",
          },
          pb: 4,
          width: "100%",
        }}
      >
        {plans.map((plan, idx) => {
          const price = plan.price[frequency.value];
          const currentPlan =
            !!currentTier && plan.matchTiers.includes(currentTier);

          let priceId: string | undefined;

          if (plan.tier === SubscriptionTier.PERSONAL) {
            priceId = prices.PERSONAL.MONTHLY;
          } else if (plan.tier === SubscriptionTier.PRO) {
            priceId = prices.PRO.MONTHLY;
          }

          let label: string = "";
          if (plan.cta?.label) {
            label = plan.cta.label;
          } else if (plan.name === "Enterprise") {
            label = "Contact us";
          } else if (currentTier! > plan.tier) {
            label = "Downgrade";
          } else if (currentTier! < plan.tier) {
            label = "Get Started";
          } else {
            label = "Current Plan";
          }

          async function onClick() {
            if (plan.cta?.href) {
              return null;
            }
            if (linkToStripePortal && !currentPlan) {
              const { data } = await createStripePortalSession();
              window.location.href = data?.createStripePortalSession?.url;
            } else if (
              !linkToStripePortal &&
              !currentPlan &&
              priceId !== undefined
            ) {
              const { data } = await createStripeCheckoutSession({
                variables: { priceId },
              });
              window.location.href = data?.createStripeCheckoutSession?.url;
            }
          }

          return (
            <Box
              key={plan.id}
              sx={{
                minWidth: { xs: 280, lg: "unset" },
                maxWidth: 380,
                flex: { xs: "0 0 auto", lg: "unset" },
                backgroundColor: idx % 2 === 0 ? "#fff" : "#f0f6ff",
                outline: "2px solid #d1e4ff",
                borderRadius: 2,
                boxShadow: "0 1px 4px #0001",
                px: 2,
                py: 2,
                position: "relative",
                scrollSnapAlign: { xs: "start", lg: "unset" },
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <Typography variant="h2" fontWeight={700} mb={1}>
                {plan.name}
              </Typography>
              <Typography mb={2} sx={{ fontSize: "15px" }}>
                {plan.description}
              </Typography>

              <Button
                variant={plan.name === "Enterprise" ? "outlined" : "contained"}
                href={plan.cta?.href}
                onClick={onClick}
                fullWidth
                sx={{
                  mb: 2,
                  background:
                    plan.name === "Enterprise" ? "transparent" : "#1D69F4",
                  color: plan.name === "Enterprise" ? "#1D69F4" : "white",
                  borderColor: "#1D69F4",
                  fontWeight: 700,
                  "&:hover": {
                    background:
                      plan.name === "Enterprise" ? "#f5faff" : "#145fc9",
                    color: plan.name === "Enterprise" ? "#1D69F4" : "white",
                  },
                }}
                disabled={anythingLoading || currentPlan}
              >
                {anythingLoading && (
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                )}
                {label}
              </Button>
              <Box mb={2}>
                <Typography variant="h2" fontWeight={700} display="inline">
                  {price}
                </Typography>
                {!["Free", "Contact us"].includes(price) && (
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    display="inline"
                  >
                    {frequency.priceSuffix}
                  </Typography>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                {plan.features.map((feature, i) => (
                  <Box
                    component="li"
                    key={i}
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <span
                      style={{
                        color: "#1D69F4",
                        fontSize: 18,
                        marginTop: 2,
                        marginRight: 6,
                      }}
                    >
                      {/* Checkmark SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        fill="none"
                      >
                        <g clipPath="url(#a)">
                          <path
                            fill="#1D69F4"
                            d="M13.928.913a.849.849 0 0 0-1.19.194L4.742 12.26 2.07 9.586a.855.855 0 0 0-1.208 1.208l3.38 3.385a.872.872 0 0 0 1.298-.108l8.588-11.967a.848.848 0 0 0-.2-1.19Z"
                          />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path
                              fill="#fff"
                              d="M.613.748H14.29v13.676H.613z"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <Typography variant="body2" component="span">
                      {feature.content}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
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
