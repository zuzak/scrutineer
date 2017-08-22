# scrutineer
[![Build Status](https://travis-ci.org/zuzak/scrutineer.svg?branch=master)](https://travis-ci.org/zuzak/scrutineer)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1f2b7c213b34470db18e7e59b133a894)](https://www.codacy.com/app/douglas/scrutineer)
[![Heroku](http://heroku-badge.herokuapp.com/?app=scrutineer&svg=1)](https://scrutineer.herokuapp.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Screenshots
[![Screenshot of Questionnaire](https://i.imgur.com/605GZBsb.png)](https://i.imgur.com/605GZBs.png)
[![Screenshot of Council detail](https://i.imgur.com/xVyafxab.jpg)](https://i.imgur.com/xVyafxa.jpg)
[![Screenshot of Station detail](https://i.imgur.com/00cSkTpb.png)](https://i.imgur.com/00cSkTp.png)
[![Screenshot of account creations](https://i.imgur.com/Yg6gnecb.png)](https://i.imgur.com/Yg6gnec.png)
[![Screenshot of information disclosure/profile page](https://i.imgur.com/SOjhKRib.png)](https://i.imgur.com/SOjhKRi.png)
[![Screenshot of observer verification page](https://i.imgur.com/j9v28TYb.png)](https://i.imgur.com/j9v28TY.png)
## Setup

## Requirements
* MongoDB (defaults to `mongodb://localhost/scrutineer`: override it with the `MONGODB_URI` environment variable)

By default we synchronise with upstream data sources. Set the `NO_SYNC` environment variable (to something) to disable this.

## Install
To get this running, install MongoDB, clone this repository, and then run:
```bash
$ npm install
$ npm start
```

If, on your second or later run, you wish to skip the initialisation with upstream sources, you should run:
```bash
$ NO_SYNC=1 npm start
```

## Tests
To run the Selenium tests you must have a Selenium server running.
On a Mac:
```bash
$ brew install selenium-server-standalone
```