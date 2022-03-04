FROM node:17-alpine AS builder

WORKDIR app/server

COPY ./package*.json ./
RUN npm install
COPY ./.env ./
COPY ./src ./src
EXPOSE 8080
CMD ["npm", "run", "start:dev"]
