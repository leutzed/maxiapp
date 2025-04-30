FROM node:23-alpine

RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

# Instalar openssl para resolver problemas de certificado
RUN apk add --no-cache openssl ca-certificates rsync

# Configurar NODE_TLS_REJECT_UNAUTHORIZED para resolver problemas de certificado com Prisma
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Copiar arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm install

# Gerar arquivos Prisma
# RUN npx prisma generate

# Copiar o restante dos arquivos do projeto
# COPY . .
WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 5555

# CMD ["npm", "run", "dev"]