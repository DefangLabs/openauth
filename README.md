# Defang Portal

## Local Dev

Ideally, run this in a devcontainer. VSCode should prompt you to do so. Otherwise you'll need to make sure you install the Hasura CLI and pnpm.

There is a workspace at `./portal.code-workspace`. Once you start the devcontainer, open this workspace. (you should be prompted to do so). The workspace will recommend a few extensions, and will immediately start the project, which consists of the following steps:

- Install backend dependencies
  Note: this is done this way because we mount the `fn` (api) directory into the container for live reloading. A bit hacky, but works. (Runs `docker compose run --rm api install`)
- Start the backend (Runs `docker compose up`)
- Start the Hasura console, and checks for the backend being up and hasura being healthy before starting. (Essentially runs `hasura console`)
- Install frontend dependencies
- Start the frontend in dev mode (Runs `npm dev`)

If you need to start the process yourself, can run them all manually by searching for the "run task" command in VSCode and running the following tasks:

- `backend: run dev`
- `hasura: console`
- `web: run dev`

Once the frontend is running, you can access the site at `http://localhost:3000`.

## Auth

We're using a [Defang fork of OpenAUTH](https://github.com/DefangLabs/openauth). We merge our own features into a branch called `defang` in that repo, which is pulled into a git subtree at `/auth/openauth` in this repo. To update the auth code, you can run `git subtree pull --prefix auth/openauth https://github.com/DefangLabs/openauth defang`

## Secrets

- `defang-portal:githubClientSecret`: created in GitHub settings, OAuth Apps
- `defang-portal:gitlabClientSecret`: created in GitLab preferences, Applications
- `defang-portal:hasuraAdminSecret`:
- `defang-portal:stripeSecretKey`: from Stripe dashboard

## Deploy

**Do not deploy to prod from your local machine. Let the CI take care of it.**

## Architecture

### Dependency graph:

```mermaid
flowchart
    browser["Browser"]
    browser --> hasura
    browser -->|"Authenticate (get jwt)"| auth
    browser -->|"Load page"| nextjs

	subgraph portal["Portal"]
        nextjs["Next.JS"]
		postgres["Postgres"]
		api["API"]
		hasura["Hasura"]
		auth["Auth"]

    hasura -->|"Business logic, like submitting users deletion flow."| api
    api -->|"Interacting with data during business logic (fetch users, delete from db, etc.)"| hasura
    hasura -->|"Store data"| postgres
    hasura -->|"Check JWTs against JWKs"| auth
    auth -->|"Use Hasura to store/request data from DB"| hasura
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

### Tenants

We pass the tenant ID in the `X-Defang-Tenant-Id` header. See
[docs/tenants.md](docs/tenants.md) for a detailed overview of how tenant
management works inside the portal.

### Feature Flags

Feature flags are client-side only and can be toggled via query parameters or
`localStorage`. Refer to [docs/feature-flags.md](docs/feature-flags.md) for usage
instructions.
