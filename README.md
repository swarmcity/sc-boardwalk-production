![Swarm City](https://github.com/swarmcity/sc-boardwalk-production/blob/master/images/icons/icon-48x48.png?raw=true "Swarm City")


# Swarm City
### boardwalk-production
[![Build Status](https://travis-ci.org/swarmcity/sc-boardwalk-production.svg?branch=master)](https://travis-ci.org/swarmcity/sc-boardwalk-production)

Refactor of Boardwalk in Polymer 2.0

## Contributions 
We activly welcome community contributions. Below are a set of instructions to get your dev environment setup. We have a living [Production Wiki](https://github.com/swarmcity/sc-boardwalk-production/wiki/Coding-Styles-&-Standards) detailing what, how and why we are developing this production release. Once setup head on over to the issues and see whats marked for contributions welcome.

* Keep a lookout for weekend "Tidy-up" sprints, and issues labeled with "Contributions Welcome" these are a great way to meet the team and get started making contributions.

## Setup verssion control & clone 

grab a copy of [Source Forge](https://sourceforge.net/) or [Gitkracken](https://www.gitkraken.com/) then clone the repo!

## Install developement environment
next install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli

install [Bower](https://bower.io/) using [npm](https://www.npmjs.com)

    npm install -g bower

*Linux permissions issues can be solved by adding --allow-root*

Bower install

    bower install

npm install

    npm install

## Linting with eslint
Ensuring the code base stays clean and standardized we need all merges to pass linting 

    npm run lint

If you're on Windows, add the following line to .eslintrc.json to make sure linebreaks are read correctly:

    "linebreak-style": ["error", "windows"]

## Test with Mocha and Chai via WCT

    polymer test -p

*On Windows systems the tests might fail on their first run if the firewall permissions have yet to be set*

## Build
Ensure the project builds before testing 

    polymer build

## Serve
polymer serve

    polymer serve
    polymer serve build/production

## Deploy
netlify deploy, set the deploy directory to build/production

    npm install netlify-cli -g
    netlify deploy