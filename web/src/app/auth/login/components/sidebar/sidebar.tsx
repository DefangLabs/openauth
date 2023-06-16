import { Stack, Typography, useTheme } from "@mui/material";

export function SideBar() {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      flexGrow={1}
      justifyContent="center"
      sx={{ padding: 2, px: 8 }}
      spacing={2}
    >
      <div>
        <Typography variant="h2" color="white">
          Point 1
        </Typography>
        <Typography color="white">
          Container infrastructure platforms are designed to help developers
          deploy and manage containerized applications at scale. With features
          like automated scaling, load balancing, and self-healing, these
          platforms make it easy to build and run complex applications in
          production.
        </Typography>
      </div>
      <div>
        <Typography variant="h2" color="white">
          Point 2
        </Typography>
        <Typography color="white">
          Whether you&apos;re building microservices, deploying machine learning
          models, or running a large-scale web application, a container
          infrastructure platform can help you streamline your development
          process and reduce operational overhead. By abstracting away the
          underlying infrastructure, these platforms allow you to focus on
          building great software.
        </Typography>
      </div>
      <div>
        <Typography variant="h2" color="white">
          Point 3
        </Typography>
        <Typography color="white">
          With support for popular container runtimes like Docker and
          Kubernetes, container infrastructure platforms provide a flexible and
          powerful foundation for modern application development. Whether you're
          deploying to the cloud or on-premises, these platforms make it easy to
          build, test, and deploy your applications with confidence.
        </Typography>
      </div>
    </Stack>
  );
}
