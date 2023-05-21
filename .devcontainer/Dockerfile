FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

RUN cd ~ && curl https://raw.githubusercontent.com/ory/meta/master/install.sh | sh -s ory && \
    ls -a && \
    mv ./bin/ory /usr/local/bin/ory