FROM node:17-alpine

WORKDIR app/server

COPY ./package*.json ./
RUN npm install
COPY ./.env ./
COPY ./src ./src
EXPOSE 8080
