# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

### Prerequisites
- Nix flake environment (recommended) or install Hasura CLI and Docker manually
- VSCode with DevContainer extension (recommended)

### Quick Start
1. Open the workspace file: `portal.code-workspace`
2. Use DevContainer (VSCode should prompt automatically)
3. The workspace will auto-start development services via tasks

### Manual Development Commands

#### Backend (API + Database)
```bash
# Install API dependencies
docker compose -f ./compose.dev.yaml --env-file .env.dev run --rm api i

# Start all backend services (Postgres, Hasura, API, Auth)
docker compose -f ./compose.dev.yaml --env-file .env.dev up
```

#### Frontend (Web)
```bash
cd web
npm ci                    # Install dependencies
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run graphql-codegen  # Generate GraphQL types
```

#### Hasura
```bash
cd hasura
./console-dev           # Start Hasura console (waits for backend health)
```

#### API
```bash
cd api
bun run dev            # Development with hot reload
bun run start          # Production mode
npm run graphql-codegen # Generate GraphQL types
```

## Architecture Overview

### High-Level Structure
- **web/**: Next.js frontend application
- **api/**: Bun-based API server (business logic)
- **hasura/**: GraphQL API layer with PostgreSQL
- **auth/**: OpenAuth authentication service (includes Defang fork)
- **compose.*.yaml**: Docker Compose configurations for different environments

### Technology Stack
- **Frontend**: Next.js 15, React 18, TypeScript, Material-UI, Apollo Client
- **Backend**: Bun runtime, Express.js, Hono framework
- **Database**: PostgreSQL with Hasura GraphQL engine
- **Authentication**: OpenAuth (Defang fork) with JWT
- **Protocols**: gRPC (Connect), GraphQL
- **Infrastructure**: Docker Compose, Nix flake

### Service Communication
```
Browser → Next.js (web:3000)
Browser → Hasura GraphQL (hasura:8080) 
Browser → Auth Service (auth:3001)
Hasura → API (api:3003) for business logic
API → Hasura for data operations
Auth → Hasura for user data storage
```

### Key Integrations
- **Defang Fabric**: gRPC service for cloud operations
- **Stripe**: Payment processing and billing
- **Segment**: Analytics tracking
- **GraphQL Code Generation**: Automated type generation for both web and API

## Development Workflows

### GraphQL Schema Updates
1. Update Hasura metadata/schema
2. Run `npm run graphql-codegen` in both `web/` and `api/` directories
3. Update TypeScript code using generated types

### Auth System
- Uses OpenAuth with custom Defang modifications
- JWT tokens with Hasura claims namespace
- User data stored in PostgreSQL via Hasura

### Testing
- Web: Jest configured with ts-jest for ESM
- API: No test framework currently configured
- Integration tests run via GitHub Actions

### Deployment
- Production deployment handled by CI/CD
- Do not deploy manually from local machine
- Uses Docker Compose for container orchestration