FROM node:20.6.0-alpine
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
RUN chown -R node:node .
USER node
COPY ../../app/package*.json /home/node/app
RUN npm install --force --loglevel verbose
COPY ./app/ /home/node/app/
CMD [ "npm", "run", "dev" ]