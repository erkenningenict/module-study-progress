// const ngApimock = require('ng-apimock')();

// ngApimock.run({
//   baseUrl: 'http://localhost:4000',
//   src: 'mocks/*',
//   outputDir: '.tmp/mocks',
//   done: function() {
//     console.log('produced initial mocks');
//   },
// });

// ngApimock.watch('mocks');

// (function serve() {
//   const http = require('http'),
//     connect = require('connect'),
//     ngApiMockRequest = require('ng-apimock/lib/utils').ngApimockRequest;

//   const app = connect();

//   app.use(ngApiMockRequest);
//   app.use('/mocking', require('serve-static')('.tmp/mocks'));
//   app.use((req, res) => {
//     console.log('incoming request url: ', req.url);
//     if (req.url.match('/graphql') !== null) {
//       console.log('Inside graphql');
//       // Real api endpoint
//       const baseUrl = `http://localhost:3010/graphql`;
//       const redirectUrl = `${baseUrl}`;
//       console.log('redirecting to API: ', redirectUrl);
//       // Redirect to the real api endpoint
//       res.writeHead(307, {
//         Location: redirectUrl,
//       });
//       res.end();
//     }
//   });

//   http.createServer(app).listen(4000);
// })();

import apimock from '@ng-apimock/core';
import devInterface from '@ng-apimock/dev-interface';
import express from 'express';
import cors from 'cors';
// const apimock = require('@ng-apimock/core');
// const express = require('express');
// const cors = require('cors');
// const devInterface = require('@ng-apimock/dev-interface');

const app = express();

app.set('port', 4000);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(204).send();
});

app.use('/dev-interface/', express.static(devInterface));

apimock.processor.process({
  src: 'mocks',
  watch: true,
});
// console.log('#DH# app', apimock.middleware());

app.use(apimock.middleware);

app.use((req, res) => {
  console.log('incoming request url: ', req.url);
  if (req.url.match('/DesktopModules') !== null) {
    console.log('inside Desktopmodules');
    // Real api endpoint
    const baseUrlProd = `https://erkenningen.administratie.nl`;
    const redirectUrl = `${baseUrlProd}${req.url}`;
    console.log('redirecting to Prod API: ', redirectUrl);
    // Redirect to the real api endpoint
    res.writeHead(307, {
      Location: redirectUrl,
    });
    res.end();
  }
  if (req.url.match('/graphql') !== null) {
    console.log('inside graphql', req.url);
    // Real api endpoint
    const baseUrl = `http://localhost:3010/graphql`;
    const redirectUrl = `${baseUrl}`;
    console.log('redirecting to API: ', redirectUrl);
    // Redirect to the real api endpoint

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.writeHead(307, {
      Location: redirectUrl,
      origin: 'http://localhost:3010',
    });
    res.end();
  }
});

app.use(cors());

app.listen(app.get('port'), () => {
  console.log(
    `mock server interface running on http://localhost:${app.get('port')}/dev-interface/#/`,
  );
});
