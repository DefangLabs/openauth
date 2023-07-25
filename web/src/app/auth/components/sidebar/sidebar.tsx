import { Stack, Typography, useTheme } from "@mui/material";

export function SideBar() {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      flexGrow={1}
      justifyContent="center"
      sx={{ padding: 2, px: 8, maxWidth: 600, margin: "auto" }}
      spacing={2}
    >
      <div>
        <Typography variant="h2" color="white">
          Complexity made simple
        </Typography>
        <Typography color="white">
          Defang helps developers deploy and manage containerized applications
          at scale. With features like automated scaling, load balancing, and
          self-healing, we make it easy to build and run complex applications in
          production.
        </Typography>
      </div>
      <div>
        <Typography variant="h2" color="white">
          Focus on building great software
        </Typography>
        <Typography color="white">
          Whether you&apos;re building microservices, deploying machine learning
          models, or running a large-scale web application, Defang can help you
          streamline your development process and reduce operational overhead.
          By abstracting away the underlying infrastructure, we allow you to
          focus on building great software.
        </Typography>
      </div>
    </Stack>
  );
}
