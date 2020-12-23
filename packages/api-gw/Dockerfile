# Build
FROM node:14.14-alpine as builder

# Environment
WORKDIR /src/app

# Dependencies
COPY package.json /src/app/
COPY yarn.lock /src/app/
COPY lerna.json /src/app/

COPY ./packages/mongodb-connection-module /src/app/packages/mongodb-connection-module
COPY ./packages/statistics-module /src/app/packages/statistics-module
COPY ./packages/urlshortner-module /src/app/packages/urlshortner-module
COPY ./packages/api-gw /src/app/packages/api-gw

RUN yarn install --frozen-lockfile --production -W

# Serve
FROM node:14.14-alpine

ENV NODE_ENV=production
ARG PORT
WORKDIR /src/app

COPY --from=builder /src/app /src/app

EXPOSE $PORT

ENTRYPOINT ["yarn", "start:server"]
