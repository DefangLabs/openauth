FROM node:19-alpine

RUN npm install -g pnpm 

WORKDIR /app

ENTRYPOINT [ "pnpm" ]