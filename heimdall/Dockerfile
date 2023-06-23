FROM alpine:3.18.0 as builder

ARG ENV=dev

COPY ./config /tmp

RUN mkdir -p /heimdall/conf/rules && mkdir -p /heimdall/conf/keys

RUN cp /tmp/config.yaml /heimdall/conf/config.yaml
RUN cp /tmp/rules/${ENV}.rules.yaml /heimdall/conf/rules/${ENV}.rules.yaml
RUN cp -r /tmp/keys/${ENV} /heimdall/conf/keys/${ENV}

FROM defangportal/heimdall-base:path-rewrite.3

COPY --from=builder /heimdall /heimdall
COPY ./config/keys/dev/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt