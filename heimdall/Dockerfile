FROM node:18.16.1-alpine as builder

ARG ENV=dev
ARG PUBLIC_ROOT_URL="http://localhost:5000"
ARG HASURA_DOMAIN="hasura:8080"
ARG FN_DOMAIN="fn:5001"
ARG NEXTJS_DOMAIN="host.docker.internal:3000"

COPY ./config /tmp

RUN mkdir -p /heimdall/conf/rules && mkdir -p /heimdall/conf/keys

RUN node /tmp/rules/generate.js

RUN cat /tmp/rules/${ENV}.rules.yaml

RUN cp /tmp/config.yaml /heimdall/conf/config.yaml
RUN cp /tmp/rules/${ENV}.rules.yaml /heimdall/conf/rules/rules.yaml
RUN cp -r /tmp/keys/${ENV} /heimdall/conf/keys

FROM dadrus/heimdall:0.10.1-alpha

COPY --from=builder /heimdall /heimdall
COPY ./config/keys/dev/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt