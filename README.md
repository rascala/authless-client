# Authless Client • ![](https://github.com/authless/authless-client/workflows/Node.js%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/2c66981166edee3f475d/maintainability)](https://codeclimate.com/github/authless/authless-client/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2c66981166edee3f475d/test_coverage)](https://codeclimate.com/github/authless/authless-client/test_coverage)

A client for easier access to hosted authless-server.

## Install

```
yarn add @authless/client
# - or -
npm install @authless/client
```

## Usage

```javascript
import { Client } from '@authless/client'

// setup a client
authlessClient = new Client({
  uri: 'http://example.com:4000',
  retries: 2,
});

// use it
authlessClient.url(urlToFetch, {referer: 'optional', responseFormat: 'json'})
authlessClient.url(urlToFetch, {responseFormat: 'png'})
```
