# Build
FROM node:14.14-alpine as builder

# Environment
WORKDIR /src/app

# Dependencies
COPY package.json /src/app/
COPY yarn.lock /src/app/
COPY lerna.json /src/app/

COPY ./packages /src/app/packages

RUN yarn install --frozen-lockfile --production -W

# Serve
FROM node:14.14-alpine

ENV NODE_ENV=production
ARG PORT
WORKDIR /src/app

COPY --from=builder /src/app /src/app

EXPOSE $PORT

ENTRYPOINT ["yarn", "start:server"]
