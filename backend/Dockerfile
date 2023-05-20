FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

RUN npm install

RUN apk add --no-cache bash

COPY . .

EXPOSE 3001

RUN npx tsc

CMD ["npm", "start"]