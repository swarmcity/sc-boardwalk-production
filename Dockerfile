FROM node:7.10-wheezy
RUN npm install -g ethereumjs-testrpc
RUN npm install -g truffle

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

# hack to allow importing swarmcity:0.0.1
RUN mkdir -p contracts/ && cp -R installed_contracts/swarmcity/ contracts/swarmcity/
RUN mkdir -p contracts/swarmcity/installed_contracts/zeppelin/contracts/ownership/ && \
    cp installed_contracts/zeppelin/contracts/ownership/Ownable.sol \
           contracts/swarmcity/installed_contracts/zeppelin/contracts/ownership/Ownable.sol

COPY contracts ./contracts/
RUN ls -l contracts
RUN npm run compilecontracts

COPY migrations ./migrations/

COPY test ./test/

RUN testrpc > /dev/null & truffle migrate && truffle test ./test/contracts/*.js
