FROM oven/bun:1.1-debian

# Set the working directory
WORKDIR /app

COPY ./package.json ./bun.lockb /app/
RUN bun install --frozen-lockfile

COPY . /app

USER bun

EXPOSE 3000/tcp

ENTRYPOINT ["bun"]

CMD ["run", "start"]
