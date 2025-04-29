FROM node:slim

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN apt-get update -y && apt-get install -y openssl
RUN npm install
# RUN npx prisma generate

COPY . .

EXPOSE 3000
EXPOSE 5555

CMD ["npm", "run", "dev"]