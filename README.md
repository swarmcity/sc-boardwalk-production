![Swarm City](https://github.com/swarmcity/sc-boardwalk-production/blob/master/images/icons/icon-48x48.png?raw=true "Swarm City")
# Swarm City
### boardwalk-production
[![Build Status](https://travis-ci.org/swarmcity/sc-boardwalk-production.svg?branch=master)](https://travis-ci.org/swarmcity/sc-boardwalk-production)

Refactor of Boardwalk in Polymer 2.0

## Install

install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli
   
install [Bower](https://bower.io/) using [npm](https://www.npmjs.com)

    npm install -g bower

Bower install

    bower install
*Linux permissions issues can be solved by adding --allow-root*

npm install

    npm install

## Lint
google linter

    npm run lint

*If you're on Windows, add the following line to .eslintrc.json to make sure linebreaks are read correctly: 
    "linebreak-style": ["error", "windows"]*    

## Test
test

    npm run test
*On Windows systems the tests might fail on their first run if the firewall permissions have yet to be set*

## Build
polymer build

    polymer build

## Serve
polymer serve

    polymer serve
    polymer serve build

## Deploy
netlify deploy

    npm install netlify-cli -g
    netlify deploy