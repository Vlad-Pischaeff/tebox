'use strict';

const config = require('@tebox/config/server');
const fs = require('fs');
const express = require('express');
const app = express();

let privateKey, certificate, credentials, server;

const isHTTPs = config.SERVER_PROTO === "https";

if (isHTTPs) {
    privateKey = fs.readFileSync('./keys/privkey.pem', { encoding: 'utf8', flag: 'r' });
    certificate = fs.readFileSync('./keys/cert.pem', { encoding: 'utf8', flag: 'r' });
    credentials = { key: privateKey, cert: certificate };
    server = require('https').createServer(credentials, app);
} else {
    server = require('http').createServer(app);
}

require('#s/startup/db')();
require('#s/startup/cors')(app);
require('#s/startup/bodyParser')(app);
require('#s/startup/routes')(app);
require('#s/startup/server')(server);
require('#s/startup/ws')(server);
