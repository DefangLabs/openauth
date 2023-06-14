FROM node:19-alpine as builder

COPY . /app

WORKDIR /app

RUN npm install -g pnpm