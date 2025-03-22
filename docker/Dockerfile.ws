FROM node:18-alpine

WORKDIR /usr/src

COPY ./package*.json ./

COPY ./packages ./packages

COPY ./turbo.json ./turbo.json

COPY ./apps/ws ./ws

RUN npm install
RUN npm run db:generate
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start:ws" ]