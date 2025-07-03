FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

RUN git clone https://github.com/git/git.git /tmp/git && \
    cd /tmp/git/contrib/subtree && \
    make && \
    make install prefix=/usr/local && \
    rm -rf /tmp/git

RUN curl -fsSL https://bun.sh/install | bash

# Install Hasura CLI
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash