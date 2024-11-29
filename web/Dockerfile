#syntax=docker/dockerfile:1.4
FROM node:18-alpine3.18 AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
RUN apk add --no-cache --update python3 make g++\
   && rm -rf /var/cache/apk/*

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY --link package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# pnpm uses the CI env variable to determine whether or not to use --frozen-lockfile https://pnpm.io/cli/install#--frozen-lockfile
ARG CI=true
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npx pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps --link /app/node_modules ./node_modules
COPY --link . .
ARG NEXT_PUBLIC_FABRIC
ARG NEXT_PUBLIC_FN_URL
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS
ARG NEXT_PUBLIC_GRAPHQL_URL
ARG NEXT_PUBLIC_KRATOS_PUBLIC_URL
ARG NEXT_PUBLIC_SEGMENT_WRITE_KEY
ARG NEXT_PUBLIC_VERSION
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID
RUN npx pnpm build

# 3. Production image, copy all the files and run next
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    addgroup --system --gid 1001 nodejs; \
    adduser --system --uid 1001 nextjs

COPY --from=builder --link /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --link --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --link --chown=1001:1001 /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

ENTRYPOINT [ "/usr/local/bin/node" ]
# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD [ "server.js" ]
