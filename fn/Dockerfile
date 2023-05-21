from node:19-alpine

USER node

# install pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

WORKDIR /app

ENV PATH="/home/node/.local/share/pnpm:${PATH}"

ENTRYPOINT [ "pnpm" ]