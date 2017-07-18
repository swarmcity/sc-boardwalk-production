FROM node:7.10-wheezy
RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install
RUN npm run compilecontracts
