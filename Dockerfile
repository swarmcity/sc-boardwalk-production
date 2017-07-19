FROM node:7.10-wheezy
RUN mkdir /app
WORKDIR /app

COPY manifest.json ./
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY bower.json ./
COPY browserify.js ./
COPY polymer.json ./
COPY wct.conf.json ./
COPY webpack.config.js ./

COPY index.html ./
COPY images ./images/
COPY src ./src/

COPY truffle.js ./
COPY ethpm.json ./
RUN npm run getcontractlibs

COPY contracts ./contracts/
RUN npm run compilecontracts

COPY migrations ./migrations/
#RUN npm run deploycontracts
#RUN npm run publishcontracts

RUN npm install -g truffle
RUN truffle migrate --network ropsten
#RUN npm run publishcontracts
