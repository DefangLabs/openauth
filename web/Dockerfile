FROM --platform=${TARGETPLATFORM} node:18-alpine3.18 as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm 
RUN rm pnpm-lock.yaml
RUN pnpm install

COPY . .

ARG PORT
ARG NEXT_PUBLIC_KRATOS_PUBLIC_URL
ARG NEXT_PUBLIC_GRAPHQL_URL
ARG NEXT_PUBLIC_FN_URL
ARG NEXT_PUBLIC_FABRIC

RUN pnpm build

FROM --platform=${TARGETPLATFORM} node:18-alpine3.18 as runtime

COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

USER node

EXPOSE 3000

ENTRYPOINT [ "/usr/local/bin/node" ]

WORKDIR /app

CMD [ "server.js" ]