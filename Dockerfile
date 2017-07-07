FROM node:7.10-wheezy
RUN npm install -g bower
RUN npm install -g polymer-cli
RUN mkdir /app
WORKDIR /app

COPY manifest.json ./
COPY polymer.json ./
COPY wct.conf.json ./

COPY bower.json ./
RUN bower --allow-root install

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY index.html ./
COPY images /app/images/
COPY src /app/src/

CMD polymer serve --hostname 0.0.0.0
