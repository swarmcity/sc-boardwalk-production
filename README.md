![Swarm City](https://github.com/swarmcity/sc-boardwalk-production/blob/master/images/icons/icon-128x128.png?raw=true "Swarm City")


# Swarm City
### boardwalk-production
[![Build Status](https://travis-ci.org/swarmcity/sc-boardwalk-production.svg?branch=master)](https://travis-ci.org/swarmcity/sc-boardwalk-production)

Refactor of Boardwalk in Polymer 2.0

## Contributions 
We activly welcome community contributions. Below are a set of instructions to get your dev environment setup. We have a living [Development Document](https://docs.google.com/document/d/1pHS30zEOy6rXduNZmA2EEwSOmhEgXVxs7sJIx7F66Co/edit?usp=sharing) detailing what, how and why we are developing this production release. Once setup head on over to the issues and see whats marked for contributions welcome.

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