FROM node:10 as builder

WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn install --pure-lockfile

COPY . /code
RUN script/update && script/generate

FROM nginx:alpine

COPY --from=builder /code /usr/share/nginx/html/
