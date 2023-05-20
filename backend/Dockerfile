FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

RUN npm install

RUN apk add --no-cache bash

RUN apk update && apk add --no-cache mariadb-client

RUN chmod -R 755 /app-backend

COPY . .

# Altera a propriedade dos arquivos para o usuário "node"
RUN chown -R node:node /app-backend

EXPOSE 3001

# Define o usuário "node" como o usuário padrão
USER node 

RUN npx tsc

CMD ["npm", "start"]