FROM node:19-alpine as builder

COPY . /app

WORKDIR /app

RUN npm install -g pnpm && pnpm install && pnpm build

ARG APP=api

WORKDIR /app/apps/${APP}

ENTRYPOINT [ "pnpm" ]

CMD [ "start" ]