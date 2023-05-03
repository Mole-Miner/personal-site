FROM node:18.16-alpine3.16 as frontend

RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY ./frontend .

RUN npm install --unsafe-perm --legacy-peer-deps

FROM node:18.16-alpine3.16 as backend

RUN apk add --no-cache make gcc g++ python3 && \
    mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY ./backend .

RUN npm install --unsafe-perm --legacy-peer-deps && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

