FROM --platform=amd64 node:20.3.0-alpine3.18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

USER node

EXPOSE 3000

CMD ["pnpm", "start"]