import { GradientSurface } from "@/components/gradient-surface/gradient-surface";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import GCPLogo from "./assets/gcp-partner.png";
import AWSLogo from "./assets/aws-partner-logo.png";
import CISLogo from "./assets/cis-logo.jpg";
import Image from "next/image";

const testimonials = [
  {
    name: "Bjørn S.",
    position: "Founder @ Early Orbit, Happylatte, App Annie / Data.ai",
    testimonial:
      "What a relief to be able to just deploy containers with Defang and not deal with the over-engineered monstrosity that is Kubernetes. I love how it just took a simple DefangService() in my Pulumi script to build and deploy with perfect defaults — it was by far the least painful part of my IaaC journey.",
  },
  {
    name: "@shemmarie",
    testimonial:
      "What sorcery is this? I can hardly believe how amazing this is!",
  },
  {
    name: "Jason F.",
    position: "CEO @ DIA",
    testimonial:
      "With Defang we were able to deploy our application within our own AWS account in under an hour. Leveraging a developer tool with built in expertise to map from a logical description of our application onto native functionality for any major cloud provider has been, and continues to be, instrumental for us.",
  },
  {
    name: "@prathamvishwakarma",
    testimonial: "WTF, It’s revolutionary",
  },
  {
    name: "Linda L.",
    position: "Student @ UBC",
    testimonial:
      "I had an amazing time working with Defang’s web hosting technology and learning about web deployment at StormHacks2024 hackathon.",
  },
  {
    name: "Joar H.",
    position: "Student @ SFU",
    testimonial:
      "Woooo 🥳! Thank you Defang Labs, for making web app deployment more accessible ❤!",
  },
  {
    name: "@dextermorgan660",
    testimonial: "The AI integration is amazing",
  },
  {
    name: "@vrx2314",
    position: "Student",
    testimonial:
      "I wanted to take a moment to express my sincere appreciation for your platform. As a student with limited production environment experience, I recently completed my first full-stack AI project deployment using Defang, and I was thoroughly impressed by the experience. Thank you for creating a solution that empowers students and newcomers to bring their projects to life.",
  },
];

export function SideBar() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = testimonials[testimonialIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      direction="column"
      flexGrow={1}
      justifyContent="center"
      sx={{ padding: 2, px: 8, maxWidth: 600, margin: "auto" }}
      spacing={4}
    >
      <Stack direction="column" spacing={1}>
        <Typography component="h2" variant="h1" color="white">
          The easiest way to develop, deploy, and debug cloud apps.
        </Typography>
        <Typography variant="h4" color="white">
          Sign in with GitHub to join hundreds of developers using Defang to
          deploy their cloud apps faster than ever before.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <a href="https://cloud.google.com/partners?hl=en" target="_blank">
          <Image
            src={GCPLogo}
            alt="GCP Partner"
            width={300}
            height={120}
            style={{ objectFit: "contain", height: 60, width: "auto" }}
          />
        </a>

        <a
          href="https://aws.amazon.com/partners/work-with-partners/"
          target="_blank"
        >
          <Image
            src={AWSLogo}
            alt="AWS Partner"
            width={300}
            height={120}
            style={{ objectFit: "contain", height: 80, width: "auto" }}
          />
        </a>

        <a
          href="https://docs.aws.amazon.com/securityhub/latest/userguide/cis-aws-foundations-benchmark.html"
          target="_blank"
        >
          <Image
            src={CISLogo}
            alt="CIS AWS Foundations Benchmark"
            width={300}
            height={120}
            style={{
              objectFit: "contain",
              height: 60,
              width: "auto",
              borderRadius: 10,
              backgroundColor: "white",
              padding: 10,
              boxSizing: "border-box",
            }}
          />
        </a>
      </Stack>
      <Stack direction="column" spacing={1}>
        <TextTransition springConfig={presets.gentle} direction="down">
          <GradientSurface
            borderRadius={(theme) => `${theme.shape.borderRadius}px`}
            p={2}
          >
            {testimonial.testimonial && (
              <Typography color="white" mb={2}>
                {testimonial.testimonial}
              </Typography>
            )}
            {testimonial.name && (
              <Typography variant="h5" color="white" fontWeight="bold">
                {testimonial.name}
              </Typography>
            )}
            {testimonial.position && (
              <Typography variant="h6" color="white">
                {testimonial.position}
              </Typography>
            )}
          </GradientSurface>
        </TextTransition>
      </Stack>
    </Stack>
  );
}
