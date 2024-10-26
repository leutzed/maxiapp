FROM node:18.20.2-alpine
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
RUN chown -R node:node .
USER node
COPY ../../app/package*.json /home/node/app
RUN npm install --force --loglevel verbose
COPY ./app/src /home/node/app/src
CMD [ "npm", "run", "dev" ]