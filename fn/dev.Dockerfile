FROM node:19-alpine

RUN npm install -g pnpm@7.15.0

WORKDIR /app

ENTRYPOINT [ "pnpm" ]