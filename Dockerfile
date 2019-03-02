FROM node:10 as builder

WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn install --pure-lockfile

COPY . /code
RUN script/generate

FROM nginx:alpine

COPY --from=builder /code/index.html /code/icons /usr/share/nginx/html/
