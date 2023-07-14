FROM --platform=${TARGETPLATFORM} node:18-alpine3.18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm 
RUN rm pnpm-lock.yaml
RUN pnpm install

COPY . .

RUN pnpm build

USER node

EXPOSE 3000

ENTRYPOINT [ "node_modules/.bin/next" ]

CMD [ "start" ]