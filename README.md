![Swarm City](https://github.com/swarmcity/sc-boardwalk-production/blob/%231_initialise_a_new_polymer_2_project/images/icons/icon-48x48.png?raw=true "Swarm City")
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

npm install

    npm install

## Lint
eslint

    npm run lint

## Test
test

    polymer test -p

## Build
polymer build

    polymer build

## Serve
polymer serve

    polymer serve
    polymer serve build/production

## Deploy
netlify deploy, set the deploy directory to build/production

    npm install netlify-cli -g
    netlify deploy