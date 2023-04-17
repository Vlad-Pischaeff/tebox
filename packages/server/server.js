'use strict';

let privateKey, certificate, credentials;

const fs = require('fs');
const express = require('express');
const app = express();

const isProduction = process.env.NODE_ENV === 'production'
                        ? true
                        : false;

if (isProduction) {
    privateKey = fs.readFileSync('./keys/privkey.pem', { encoding: 'utf8', flag: 'r' });
    certificate = fs.readFileSync('./keys/cert.pem', { encoding: 'utf8', flag: 'r' });
    credentials = { key: privateKey, cert: certificate };
}

const server = isProduction
                    ? require('https').createServer(credentials, app)
                    : require('http').createServer(app);

require('#s/startup/db')();
require('#s/startup/cors')(app);
require('#s/startup/bodyParser')(app);
require('#s/startup/routes')(app);
require('#s/startup/server')(server);
require('#s/startup/ws')(server);
