#!/usr/bin/env bash

bun install --frozen-lockfile
bun run --filter=@openauthjs/openauth build
bun --filter=defang-auth run dev