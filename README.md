# Authless Client • ![](https://github.com/authless/authless-core/workflows/Node.js%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/26c7d4d131fc816e6ca4/maintainability)](https://codeclimate.com/github/authless/authless-core/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/26c7d4d131fc816e6ca4/test_coverage)](https://codeclimate.com/github/authless/authless-core/test_coverage)

A client for easier access to hosted authless-server. Featuers a low-level
client to call the authless-server endpoints and a high-level client
that uses the low-level client and operates on a service level.

## Install

```
yarn add @authless/client
# - or -
npm install @authless/client
```

## Usage

```javascript
const { Client, ClientLowLevel, Cache } = require('@authless/client');
const { Router } = require('@authless/core');

// setup a low-level client with optional cache
authlessLowLevelClient = new ClientLowLevel({
  uri: 'http://example.com:4000',
  retries: 1,
  cache: new Cache({
    name: 'low',
    existsFn: existsFnLow,
    retrieveFn: retrieveFnLow,
    storeFn: storeFnLow,
    removeFn: removeFnLow
  }),
});

// setup services we want to fetch from with the high-level client ...
authlessLinkedin = new Linkedin();
authlessLinkedinPerson = new LinkedinPerson();
// ... and pack it up in a router
const router = new Router([
  ...authlessLinkedin.getRoutes(),
  ...authlessLinkedinPerson.getRoutes(),
]);

// setup the high-level client with optional cache
authlessClient = new Client({
  router,
  lowLevelClient: authlessLowLevelClient,
  retries: 1,
  cache: new Cache({
    name: 'high',
    existsFn: existsFnHigh,
    retrieveFn: retrieveFnHigh,
    storeFn: storeFnHigh,
    removeFn: removeFnHigh
  })
});
```
