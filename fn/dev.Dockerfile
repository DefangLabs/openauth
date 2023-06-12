FROM node:19-alpine

RUN npm install -g pnpm && pnpm install

WORKDIR /app

ENTRYPOINT [ "pnpm" ]