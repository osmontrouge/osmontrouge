FROM node:10 as builder

WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn install --pure-lockfile

COPY . /code
RUN yarn icons
RUN script/update
RUN yarn run build

FROM nginx:alpine

COPY --from=builder /code/dist /usr/share/nginx/html/
