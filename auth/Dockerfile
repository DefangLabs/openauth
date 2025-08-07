FROM oven/bun:1-debian


# Set the working directory
WORKDIR /app

COPY ./package.json ./bun.lock /app/
COPY ./openauth/packages/openauth/package.json /app/openauth/packages/openauth/package.json
COPY ./packages/auth/package.json /app/packages/auth/package.json
RUN bun install --frozen-lockfile --omit=optional

COPY ./ /app/

RUN bun run --filter=@openauthjs/openauth build

RUN bun install --frozen-lockfile

USER bun

EXPOSE 3000/tcp

ENTRYPOINT ["bun", "--filter=defang-auth"]

CMD ["run", "start"]
