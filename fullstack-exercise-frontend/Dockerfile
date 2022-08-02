FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

RUN npm run build

CMD [ "npm", "run", "start" ] 