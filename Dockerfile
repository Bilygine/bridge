FROM node:12

COPY . /code
WORKDIR /code
RUN npm install

ENTRYPOINT ["node", "server.js"]
