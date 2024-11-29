# Defang Portal

## Local Dev

Ideally, run this in a devcontainer. VSCode should prompt you to do so. Otherwise you'll need to make sure you install the Hasura CLI and pnpm.

There is a workspace at `./portal.code-workspace`. Once you start the devcontainer, open this workspace. (you should be prompted to do so). The workspace will recommend a few extensions, and will immediately start the project, which consists of the following steps:

 - Install backend dependencies
   Note: this is done this way because we mount the `fn` (api) directory into the container for live reloading. A bit hacky, but works. (Runs `docker compose run --rm fn install`)
 - Start the backend (Runs `docker compose up`)
 - Start the Hasura console, and checks for the backend being up and hasura being healthy before starting. (Essentially runs `hasura console`)
 - Install frontend dependencies
 - Start the frontend in dev mode (Runs `pnpm dev`)

If you need to start the process yourself, can run them all manually by searching for the "run task" command in VSCode and running the following tasks:

 - `backend: run dev`
 - `hasura: console`
 - `web: run dev`

Once the frontend is running, you can access the site at `http://localhost:8000`.

### NOTES

All services are designed run behind Heimdall, which is a reverse proxy that handles authorization. This includes the web service, so if you go to localhost:3000, the app won't work properly (even though you will see a login UI). You must go to localhost:8000 to access the app.

Hot reloading for Next.js doesn't work at the moment, because we're running an old version of Heimdall which doesn't support websockets. We should upgrade Heimdall to the latest version to fix this.


## Secrets
- `aiven:apiToken`: created in Aiven dashboard; this expires when unused for 10 hours; **deprecated** use `AIVEN_TOKEN` env
- `defang-portal:aivenBillingGroup`: from Aiven dashboard
- `defang-portal:githubClientSecret`: created in GitHub settings, OAuth Apps
- `defang-portal:hasuraAdminSecret`:
- `defang-portal:hasuraDatabasePassword`:
- `defang-portal:kratosDatabasePassword`:
- `defang-portal:kratosSecretsCipher0`: random 32 char string (24 bytes, base64 encoded)
- `defang-portal:kratosSecretsCookie0`: random 32 bytes, base64 encoded to 44 chars
- `defang-portal:stripeSecretKey`: from Stripe dashboard

## Deploy

Create an Aiven API token using their dashboard. Then run the following command to deploy the stack:
```
AIVEN_TOKEN=… pulumi -C pulumi up
```
**Do not deploy to prod from your local machine. Let the CI take care of it.**

## Architecture

### Dependency graph:

```mermaid
flowchart TB
  browser --> heimdall
  subgraph portal
    heimdall --always permits initial page load--> nextjs
    heimdall --authenticates requests--> kratos
    heimdall --forwards requests after authentication--> hasura
    heimdall --when generating defang tokens (should be moved behind hasura)--> fn

    fn --account deletion--> kratos
    hasura --acts as a graphql interface for--> fn
    fn --deletes resources managed by--> hasura
    kratos --> postgres
    hasura --> postgres
  end
```

### Abstract request sequence:

```mermaid
sequenceDiagram
  browser->>heimdall: 1. all requests are routed through
  heimdall->>nextjs: 2. forwards requests for `/` to nextjs
  nextjs->>heimdall: 3. responds with initial page
  heimdall->>browser: -
  browser->>heimdall: 4. http requests are routed through
  heimdall->>kratos: 5. forwards requests to kratos
  kratos<<->>postgres: 6. authenticates session ids
  kratos->>heimdall: 7. responds with user data
  heimdall->>hasura: 8. forwards requests to hasura with a generated short-lived jwt in the Authorization header
  hasura<<->>postgres: 9a. queries the database
  hasura<<->>fn: 9a. queries fn directly (should be moved behind hasura)
  hasura->>heimdall: 10. responds with data
  heimdall->>browser: -
```
