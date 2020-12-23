FROM node:14.14-alpine AS base

# Environment
WORKDIR /src/app

# Dependencies
COPY package.json /src/app/
COPY yarn.lock /src/app/
COPY lerna.json /src/app/

COPY ./packages/web-ui /src/app/packages/web-ui

RUN yarn install --frozen-lockfile --production -W

FROM base AS build

ENV NODE_ENV=production
WORKDIR /src/app

COPY --from=base /src/app /src/app

RUN yarn build:web

FROM node:14.14-alpine

ENV NODE_ENV=production
WORKDIR /src/app

COPY --from=build /src/app /src/app

RUN yarn add next -W

EXPOSE $PORT

ENTRYPOINT ["yarn", "start:web"]
