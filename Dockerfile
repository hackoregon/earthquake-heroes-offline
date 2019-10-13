FROM node:10

WORKDIR /usr/src/server

COPY package*.json ./
COPY index.js ./
COPY tiles.mbtiles ./
COPY themes themes

RUN npm install --production

EXPOSE 3456

CMD [ "node", "index.js" ]
