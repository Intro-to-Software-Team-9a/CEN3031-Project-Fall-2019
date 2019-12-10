from node:10

WORKDIR /usr/src/app

# install server
COPY package*.json ./
RUN npm ci

# install client
RUN mkdir client
COPY client/package*.json ./client/
RUN npm run ci-client

# build client
COPY . .
RUN npm run build-client

# start app
EXPOSE 5000

CMD ["npm", "start"]