import { OpenInNew } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre
    style={{
      backgroundColor: "#333",
      color: "white",
      padding: 10,
      borderRadius: 8,
    }}
  >
    <code>{children}</code>
  </pre>
);

export function EmptyServices() {
  return (
    <Stack spacing={2} maxWidth="450px" p={2}>
      <Typography variant="h1">Hi! Welcome to Defang.</Typography>
      <Typography>
        Defang makes it really, <i>really</i> easy to spin up a new service from
        a container image. To get started, you&apos;ll want to start by
        downloading the CLI.
      </Typography>
      <div>
        <Button
          href="https://github.com/DefangLabs/defang/releases/latest"
          variant="contained"
          fullWidth={false}
        >
          CLI Download{" "}
          <OpenInNew fontSize="small" style={{ marginLeft: "5px" }} />
        </Button>
      </div>
      <Typography>
        Great! First things first, let&apos;s login with the cli.
      </Typography>
      <CodeBlock>{"defang login"}</CodeBlock>
      <Typography>
        Before you can deploy code you should read and agree to our the terms of
        service. You can do this by running:
      </Typography>
      <CodeBlock>{"defang terms"}</CodeBlock>
      <Typography>
        Perfect. Now let&apos;s run the generate command. That will stand up a
        project for you with everything you need in the current directory:
      </Typography>
      <CodeBlock>{"defang generate"}</CodeBlock>
      <Typography>
        Sweet. You&apos;ve got everything you need to build your amazing new
        service. Now let&apos;s get it launched:
      </Typography>
      <CodeBlock>{"defang compose up"}</CodeBlock>
      <Typography>
        Awesome. Your service will be up and running in no time. You can check
        the status of your service with:
      </Typography>
      <CodeBlock>{"defang ls"}</CodeBlock>
      <Typography>
        That will give you all the info you need to know about your service:
        status, endpoints, environment variables, and more.
      </Typography>
    </Stack>
  );
}
