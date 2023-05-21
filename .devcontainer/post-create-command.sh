#!/bin/bash

docker-compose \
    -f docker-compose.yml \
    -f ./kratos/docker-compose.yml \
    -f ./oathkeeper/docker-compose.yml \
    -f ./hasura/docker-compose.yml build &
(cd ./fn && pnpm install) &
(cd ./web && pnpm install) &

wait