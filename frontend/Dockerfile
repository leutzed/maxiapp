FROM node:23-alpine

RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

# Instalar openssl para resolver problemas de certificado
RUN apk add --no-cache openssl ca-certificates rsync

# Configurar NODE_TLS_REJECT_UNAUTHORIZED para resolver problemas de certificado com Prisma
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY package*.json ./

RUN npm install

WORKDIR /usr/src/frontend